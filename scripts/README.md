These notes document the process of configuring Asset Tracker manually.

# Run Locally

## Prepare Repository

```
# Clone Repository
cd ~/Projects
git clone git@github.com:AmericanPublicPowerAssociation/AssetTrackerDevelopment.git appa-asset-tracker

cd ~/Projects/appa-asset-tracker
# Install Node Dependencies
npm install
# Install Python Dependencies
pip install -r requirements
# Install Pre-Commit Hooks
pre-commit install
```

## Prepare Experimental Database
The following steps have been tested on Fedora 27. [Click here for details on configuring PostgreSQL in Fedora](https://fedoraproject.org/wiki/PostgreSQL).

```
# Install postgresql packages
sudo dnf -y install \
    postgis \
    postgresql-server
sudo postgresql-setup --initdb --unit postgresql

# Start postgresql service
sudo systemctl start postgresql

# Create database
sudo -s
    su postgres
        psql
            CREATE DATABASE asset_tracker;

# Add postgis extensions to database
sudo -s
    su postgres
        psql -d asset_tracker
            CREATE EXTENSION postgis;

# Grant all privileges on test database to test user "abc"
sudo -s
    su postgres
        psql -d asset_tracker
            GRANT ALL ON DATABASE asset_tracker TO abc;
```

## Serve Application

```
# Run experimental API server
cd ~/Projects/appa-asset-tracker/asset-tracker-development
python server/app-flask.py
# Run experimental interface server
cd ~/Projects/appa-asset-tracker/asset-tracker-development
npm start
```
