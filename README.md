# Restaurants in Zurich

A simple webmap with Leaflet showing restaurants and other food establishments in Zurich City.

## Categories

The webmap shows restaurants and other food establishments. Each category (`betriebsart`) has its own color which is calculated by `getCategoryColor()`.

The restaurants and other food establishments can be filtered using the provided dropdown on the top right of the map.

## Popup

The popup contains the name (`betriebsname`) and the address.

## Data
| | |
|----|---|
| Source | [Stadt Zürich](https://data.stadt-zuerich.ch/dataset/geo_gastwirtschaftsbetriebe) |
| License | [Creative Commons CCZero](http://opendefinition.org/licenses/cc-zero/) |

A copy of the data (April 18, 2024) can be found here [`data/stp.gastwirtschaftsbetriebe.json`](/data/stp.gastwirtschaftsbetriebe.json).