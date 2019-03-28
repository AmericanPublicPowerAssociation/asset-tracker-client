import Select from 'react-select';
import FormLabel from '@material-ui/core/FormLabel'
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

class AssetDetail extends PureComponent {

  state = {
    vendorNameInput: '',
    vendorSearchHints: [],
    productNameInput: '',
    productSearchHints: [],
    versionInput: '',
    versionSearchHints: [],
  }

  componentDidUpdate(prevProps, prevState) {
    const {vendorNameInput, productNameInput, versionInput} = this.state;
    const {focusingAsset} = this.props;
    const focusingAssetTypeId = focusingAsset.get('typeId')
    if (!focusingAssetTypeId) return null
    const type = ASSET_TYPE_BY_ID[focusingAssetTypeId]

    if ((focusingAsset.get('vendorName', null) !== null && prevProps.focusingAsset.get('vendorName', null) === null) || focusingAsset.get('id') !== prevProps.focusingAsset.get('id')) {
      console.log('swqitching')
      this.setState({
        vendorNameInput: focusingAsset.get('vendorName', ''),
        productNameInput: focusingAsset.get('productName', ''),
        versionInput: focusingAsset.get('productVersion', ''),
      })
    } else if (focusingAsset.get('vendorName') !== prevProps.focusingAsset.get('vendorName')) {
      this.setState({
        vendorNameInput: focusingAsset.get('vendorName', ''),
      })
    } else if (focusingAsset.get('productName') !== prevProps.focusingAsset.get('productName')) {
      return 1;
    } else if (focusingAsset.get('productVersion') !== prevProps.focusingAsset.get('productVersion')) {
      return 1;
    } else if (vendorNameInput !== prevState.vendorNameInput && vendorNameInput !== '') {
      fetch(`http://18.206.94.219:5000/vendor_search?type=${type}&vendor=${vendorNameInput}`)
          .then((response)=> {
            response.json()
              .then((hints) => {
                this.setState({
                  vendorSearchHints: hints.map(h => {return {'label': h, 'value': h}})
                })
              })
          })
    } else if (productNameInput !== prevState.productNameInput && productNameInput !== '') {
      fetch(`http://18.206.94.219:5000/product_search?type=${type}&vendor=${vendorNameInput}&product=${productNameInput}`)
          .then((response)=> {
            response.json()
              .then((hints) => {
                this.setState({
                  productSearchHints: hints.map(h => {return {'label': h, 'value': h}})
                })
              })
          })
    } else if (versionInput !== prevState.versionInput && versionInput !== '') {
      fetch(`http://18.206.94.219:5000/version_search?type=${type}&vendor=${vendorNameInput}&product=${productNameInput}&version=${versionInput}`)
          .then((response)=> {
            response.json()
              .then((hints) => {
                this.setState({
                  versionSearchHints: hints.map(h => {return {'label': h, 'value': h}})
                })
              })
          })
    }
  }

  render() {
    const {
      vendorNameInput,
      vendorSearchHints,
      productNameInput,
      productSearchHints,
      versionInput,
      versionSearchHints
    } = this.state;
    const {
      classes,
    } = this.props;

    return (

        <FormLabel className={classes.attribute}>
          Vendor Name
          <Select
            options={vendorSearchHints}
            inputValue={vendorNameInput}
            value={{value: focusingAsset.get("vendorName"), label: focusingAsset.get("vendorName")}}
            blurInputOnSelect={true}
            onBlur={() => {}}
            onChange={option =>
                updateAsset({
                  id: focusingAssetId,
                  vendorName: option.value,
                })
            }
            onInputChange={value => {
                if (value !== '') {
                  this.setState({
                    vendorNameInput: value,
                  })
                }
              }
            }/></FormLabel>
        <FormLabel
          className={classes.attribute}
        >Product Name

<Downshift
  onChange={option =>
      updateAsset({
        id: focusingAssetId,
        vendorName: option.value,
      })
  }
  selectedItem={{value: focusingAsset.get("vendorName"), label: focusingAsset.get("vendorName")}}
  itemToString={item => item.value}
>
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue: inputValue2,
          selectedItem,
          highlightedIndex,
        }) => (
          <div className={classes.container}>
             <TextField
                InputProps={{
                  ...getInputProps({
                    onChange: event => {
                      if (event.target.value !==  '') {
                        this.setState({
                          vendorNameInput: event.target.value,
                        })
                      }},
                  }),
                }}
                fullWidth={true}
          />
            {isOpen ? (
              <Paper className={classes.paper} square>
                {
                vendorSearchHints.map((suggestion, index) => {
                    const isHighlighted = highlightedIndex === index;
                    const isSelected = (selectedItem.value || '').indexOf(suggestion.label) > -1;
                    return (
                      <MenuItem
                        {...getItemProps({ item: suggestion.label })}
                        key={suggestion.label}
                        selected={isHighlighted}
                        component="div"
                        style={{
                          fontWeight: isSelected ? 500 : 400,
                        }}
                      >
                        {suggestion.label}
                      </MenuItem>
                    )
                  }
                )
                }
              </Paper>
            ) : null}
          </div>
        )}
</Downshift>

        <FormLabel>Product Name

          <Select
            inputValue={productNameInput}
            defaultInputValue={productNameInput}
            options={productSearchHints}
            value={{value: focusingAsset.get("productName"), label: focusingAsset.get("productName")}}
            blurInputOnSelect={true}
            onBlur={() => {}}
            onChange={option =>
                updateAsset({
                  id: focusingAssetId,
                  productName: option.value,
                })
            }
            onInputChange={value => {
              if (value !== '') {
                this.setState({
                  productNameInput: value,
                })
              }}
            }/></FormLabel>
        <FormLabel
            className={classes.attribute}
        >Product Version
          <Select
            inputValue={versionInput}
            defaultInputValue={versionInput}
            options={versionSearchHints}
            value={{value: focusingAsset.get("productVersion"), label: focusingAsset.get("productVersion")}}
            blurInputOnSelect={true}
            onBlur={() => {}}
            onChange={option =>
                updateAsset({
                  id: focusingAssetId,
                  productVersion: option.value,
                })
            }
            onInputChange={value => {
              if (value !==  '') {
                this.setState({
                  versionInput: value,
                })
              }}
            }/></FormLabel>

        {/*
        <TextField
          label='kW'
          value={focusingAsset.get('kW')}
          type='number'
          fullWidth
          className={classes.attribute}
          onChange={event => updateAsset({
            id: focusingAssetId,
            kW: event.target.value,
          })}
          />
        */}

    )
  }
}

export default withStyles(styles)(AssetDetail)



import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
];

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});



    <div className={classes.root}>

      <Downshift id="downshift-simple">
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem,
        }) => (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                placeholder: 'Search a country (start with a)',
              }),
            })}
            <div {...getMenuProps()}>
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {getSuggestions(inputValue).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion.label }),
                      highlightedIndex,
                      selectedItem,
                    }),
                  )}
                </Paper>
              ) : null}
            </div>
          </div>
        )}
      </Downshift>

        <Downshift>
          {({
            getInputProps,
            getMenuProps,
            isOpen,
          }) => {
            const inputProps = getInputProps()
            const menuProps = getMenuProps()
            return (
            <div>
              <TextField InputProps={inputProps} />
              <div {...menuProps}></div>
            </div>
            )
          }}
        </Downshift>

