from setuptools import find_packages, setup


with open('requirements.txt') as f:
    REQUIREMENTS = f.readlines()

with open('README.md') as f:
    DESCRIPTION = f.read()

dev_requires = [
    'pyramid_debugtoolbar',
    'pytest',
    'webtest',
]

setup(
    name='asset-tracker',
    version='0.1.0',
    description='Asset Tracker',
    long_description=DESCRIPTION,
    classifiers=[
        'Programming Language :: Python :: 3',
        'Framework :: Flask-Restful',
        'Topic :: Internet :: WWW/HTTP :: WSGI :: Application',
    ],
    author='CrossCompute Inc',
    author_email='support@crosscompute.com',
    url='https://crosscompute.com/docs',
    keywords='web crosscompute',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    setup_requires=[
        'pytest-runner',
    ],
    extras_require={
        'dev': dev_requires,
    },
    install_requires=REQUIREMENTS,
    tests_require=[
        'mock',
        'pytest',
        'pytest-mock',
        'werkzeug',
        'webob',
    ],
    entry_points={
        'paste.app_factory': [
            'main = asset_tracker:main'
            ],
        }
    )
