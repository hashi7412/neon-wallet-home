import React from "react";
import styled from "styled-components";

type dir = "lr" | "rl";

interface SectionProps {
	dir:				dir
	imgSide:			JSX.Element | null
	contentWidth?:		number
	className?:			string
}

interface SectionWrapperProps {
	dir:				dir
	contentWidth:		number
}

const SectionWrapper = styled.div<SectionWrapperProps>`
	display: flex;
	padding: 50px 0;
	flex-direction: ${props => (props.dir === "lr" ? "row" : "row-reverse")};

	>div {
		&:first-child {
			width: ${props => props.contentWidth}%;
			padding-left: 15px;
			padding-right: 15px;

			h1 {
				font-size: 3.5em;
				font-weight: 900;
				margin-bottom: 1em;
			}

			h3 {
				font-size: 1.8em;
				font-weight: 700;
				margin-bottom: 1em;
			}

			p, span {
				font-size: 1.2em;
			}
		}

		&:last-child {
			width: ${props => (100 - props.contentWidth)}%;
			align-self: center;

			img {
				width: 100%;
				max-height: 100%;
			}
		}
	}
`

const Section: React.FC<SectionProps> = ({ dir, children, imgSide, contentWidth, className }) => {

	return (
		<SectionWrapper dir={dir} contentWidth={contentWidth || 50} className={className}>
			{ children }
			<div>
				{ imgSide }
			</div>
		</SectionWrapper>
	)
}

export default Section;