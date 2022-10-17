# Database Description

## User collection
- userID
- userEmail
- userZIP (optional)
  - Used for extreme weather notification (only available in USA)

## Houseplant collection
- plantID
- plantUserName
  - Allows user to pick a name for their plant
- plantLatinName (optional)
  - Species and subspieces if relevant
- plantCommonName (optional)
  - Common name for plant species
- plantSource (optional)
  - Allows user to track where they purchased the plant or seed

## HouseplantUpdate collection
- plantID
  - Matches plantID from Houseplant collection
- date
- plantHeight (optional)
- plantWidth (optional)
- health (optional)
  - user picks 1-10 based on how healthy the plant looks
- comment (optional)

## PlantInfo collection
- varietyID
- latinName (optional)
- commonName (optional)
- lightInfo (optional)
- waterInfo (optional)
- containerInfo (optional)
- nutrientInfo (optional)
- pruningInfo (optional)
- otherInfo (optional)
