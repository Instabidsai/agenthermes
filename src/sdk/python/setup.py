from setuptools import setup, find_packages

setup(
    name="agenthermes",
    version="1.0.0",
    description="AgentHermes SDK - Check Agent Readiness Scores, discover agent-ready businesses, and facilitate verified agent-to-business commerce.",
    long_description=open("README.md").read() if __import__("os").path.exists("README.md") else "",
    long_description_content_type="text/markdown",
    author="AgentHermes",
    author_email="hello@agenthermes.ai",
    url="https://agenthermes.ai",
    project_urls={
        "Documentation": "https://agenthermes.ai/docs/sdk",
        "Source": "https://github.com/agenthermes/sdk-python",
    },
    py_modules=["agenthermes"],
    python_requires=">=3.9",
    install_requires=[
        "httpx>=0.24.0",
    ],
    extras_require={
        "requests": ["requests>=2.28.0"],
    },
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
        "Programming Language :: Python :: 3.13",
        "Topic :: Software Development :: Libraries :: Python Modules",
    ],
    license="MIT",
)
