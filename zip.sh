#!/bin/bash
zip -r zipfile.zip . -x ".*" -x "*/.*" -x ".gitignore" -x ".git/" -x "zip.sh" -x "readme.md"