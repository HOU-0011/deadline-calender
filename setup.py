from setuptools import setup

setup(
    name="test",
    version="1.0.0",
    install_requires=["flask"],
    extras_require={
        "develop": []
    },
    entry_points={
        "console_scripts": [],
        "gui_scripts": []
    }
)
