#!/bin/bash

build() {
    echo 'building react'
    rm -rf dist/*
    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    react-scripts build
}

build
exit 1