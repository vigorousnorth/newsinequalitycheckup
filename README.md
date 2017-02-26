#Mapping news inequality

##Marine Park is “old, arrested” -- Williamsburg is “new, bar”

The problem: Not all communities receive equal coverage, and what little coverage they do get can be skewed towards "crimes and fires".

How can we shed light on the unequal ways news organizations cover different communities?

This project begins to build out ways of investigating and parsing newspaper coverage by geographic area, with the goal of exposing subtle bias in the areas of coverage.

------------------------------------------------
Guiding questions

* Spatial inequality in news coverage -- are communities getting covered equally? Are certain communities being overlooked?
* Transparency/accountability by news orgs -- how can news orgs audit their coverage for gaps?


Solution: A set of tools to analyze equality in coverage
--------------------------------------------------------
Using a measure of "artciples per capita" and some basic word frequency analysis, we visualized the most attention-grabbing places, and the different types of words used in headlines about each.

We'd like to develop a tool for newsrooms and civic advocates to assess local news coverage and promote more equitable distribution of journalism resources.


Process notes/documentation
--------------------------------------------------------
###What type of data you can use to visualize news coverage
* Tags with place names, scoped to the area you want to look at (neighborhoods in a city, towns in a state, etc.)
	- We used Gothamist tag pages, since they tag each story by NYC neighborhood: http://gothamist.com/tags/marinepark
	- On DNAinfo, used search results by keyword (e.g. "Marine Park" Brooklyn): https://www.dnainfo.com/new-york/search?q=%22marine+park%22+brooklyn
* Headlines/ledes associated with each tag, for word analysis
	- This will usually be included in a tag page or search results page

###Getting the data
* Web scraper + HTML parser
	Various tools would work here: Python + Beautifulsoup, R

###Outcomes
* There were no clear correlations
	The 2 places (Maine/Brooklyn) were really different cases that looked different
	* Maine: pretty even per capita coverage across household income levels (so coverage was more or less proportionate with population)
	* Brooklyn: extremely uneven coverage, not related to population

* Context is important in interpreting the data
	The areas in Maine that received disproportionate coverage (NAMES?) had specific reasons why (ongoing scandal increased coverage, major state employer based in a smaller town)
	Would caution anyone doing this on a large scale to take care interpreting the results for this reason

###Hypotheses! Or what we want to explore next
* who is any given media organization alienating?

* it's harder to trust an organization if you don't see yourself or your community represented -- is trust lower in communities that get less coverage?

* are communities that get fewer journalism resources more susceptible to disinformation?

###Types of data that could be used for comparison
* 311 calls
* Household income
* Voting data
* Rural/urban rating
