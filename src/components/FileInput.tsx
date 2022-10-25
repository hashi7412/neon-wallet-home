import React from "react";
import styled from "styled-components";
import Icon from "./Icon";

interface FileInputProps {
    defaultLabel:       string
    label:              string
    onChange:           any
}

const FileInputWrapper = styled.label`
    flex: 1;
    display: flex;

    input {
        max-width: 0;
        max-height: 0;
        margin: 0;

        &:focus {
            & + .file {
                border: 1px solid var(--color-link) !important;
                box-shadow: 0 0 10px 0 var(--border);
            }
        }
    }

    .file {
        display: flex;
        align-items: center;
        gap: 1em;
        padding: 0 1em !important;
        border: 1px solid var(--border);
        border-radius: 5px;
        width: 100%;
        height: 41px;
        transition: all 0.3s ease-in-out;

        &:hover, &:focus {
            border: 1px solid var(--color-link) !important;
            box-shadow: 0 0 10px 0 var(--border);
        }

        .file-icon {
            min-width: 25px;
            min-height: 25px;
        }

        span {
            flex: 1;
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
`

const FileInput = ({ defaultLabel, label, onChange }: FileInputProps) => {

    // const [filename, setFilename] = React.useState("");

    const onFileChange = (e) => {
        if (e.target.files.length !== 0){
            onChange(e.target.files[0].name, e.target.files[0]);
        }
    }

    return (
        <FileInputWrapper>
            <input type="file" onChange={onFileChange} required />
            <div className="file">
                <Icon icon="BrowseFile" className="file-icon" />
                <span style={{flex: 1, textOverflow: "", wordBreak: "break-all"}}>
                    {label !== "" ? label : (defaultLabel)}
                </span>
            </div>
        </FileInputWrapper>
    )
}

export default FileInput;