# QCN_spatial

Based on the data available  `1_Asset_v0-1` (MCTI, 2020), only one column was included. 
This column is obtained by relating the **IBGE FITO** to the **LULC classes (Mapbiomas-C8, 2023)** and generating the *'MB_C8'* column.  
`**IBGE FITO** to the **LULC classes (Mapbiomas-C8, 2023)`

### Eg. Amazon - `1_Asset_v0-1`

| fito   | c_abg | c_bgb | c_dw | c_litter | total |  MB_C8
| ----   | ----- | ----- | ---- | -------- | ------ | ------
| `Aa`   | 117.3 | 11.7  | 9.5  | 6.8      | ..... |   3     
| `Ab`   | 133.9 | 13.4  | 10.9 | 7.7      | ..... |   3           
| `..`   | ..... | ..... | .... | ........ | ..... | ......
| `Pa`   |  43.9 | 16.2  |  4.8 | 1.6      | ..... |   11     

The original data are geopackages. To ingest assets tile it into Earth Engine (.EE), all the biomes had to be divided into tiles. Well, like the Amazon process, it was also done using tiles.

# Results Assets

Once the data has been processed and is available in .EE, the path to accessing are:

###  ---> 📂Folder QCN - root path: 
```javascript
var path = 'projects/mapbiomas-workspace/SEEG/2023/QCN'
```

| Asset | Description | Scale | format | Complete path | 
| ----- | ----------- |-------|--------|---------------------------------------------|
| `0_Data_Official_tiles`       | tile files from all biomes raster (GDAL)*                         | 30m          | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/0_Data_Official_tiles' 
| `0_pastVegetation_v0-1`       | tile files from biome Amazon for rasterize (.EE)                  | 30m          | 'ee.Img'  | 'projects/mapbiomas-workspace/SEEG/2023/QCN/0_pastVegetation_v0-1' 
| `0_pastVegetation_v0-2`       | tile files from biome Amazon for rasterize (.EE)                  | 250m         | 'ee.Img'  | 'projects/mapbiomas-workspace/SEEG/2023/QCN/0_pastVegetation_v0-2' 
| `1_Asset_v0-1`                | Official data QCN - BR                                            | 30m          | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/1_Asset_v0-1' 
| `1_Asset_v0-2`                | Official data QCN - BR                                            | 250m & 30m   | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/1_Asset_v0-2' 
| `2_Asset_v0-1_rect`           | Official data ('QCN-BR') rectified by weighted average ´FITO´     | 30m          | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/2_Asset_v0-1_rect' 
| `2_Asset_v0-2_rect`           | Official data ('QCN-BR') rectified by weighted average ´FITO´     | 250m & 30m   | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/2_Asset_v0-2_rect' 
| `3_Asset_v0-1_rect_AGB`       | .........                rectified AGB by weighted average ´FITO´ | 30m          | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/3_Asset_v0-1_rect_AGB' 
| `3_Asset_v0-1_rect_BGB`       | .........                rectified BGB by weighted average ´FITO´ | 30m          | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/3_Asset_v0-1_rect_BGB'
| `3_Asset_v0-1_rect_CDW`       | .........                rectified CDW by weighted average ´FITO´ | 30m          | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/3_Asset_v0-1_rect_CDW'
| `3_Asset_v0-1_rect_LIT`       | .........                rectified LIT by weighted average ´FITO´ | 30m          | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/3_Asset_v0-1_rect_LIT'
| `4_Asset_v0-2_rect_AGB`       | .........                rectified AGB by weighted average ´FITO´ | 250 & 30m    | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/4_Asset_v0-2_rect_AGB' 
| `4_Asset_v0-2_rect_BGB`       | .........                rectified BGB by weighted average ´FITO´ | 250 & 30m    | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/4_Asset_v0-2_rect_BGB'
| `4_Asset_v0-2_rect_CDW`       | .........                rectified CDW by weighted average ´FITO´ | 250 & 30m    | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/4_Asset_v0-2_rect_CDW'
| `4_Asset_v0-2_rect_LIT`       | .........                rectified LIT by weighted average ´FITO´ | 250 & 30m    | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/4_Asset_v0-2_rect_LIT'
```javascript
// *Expect biome AMZ
``


```javascript
// +INFO Assets QCN (eg.total)
// Data official (total)
var data_Total_carbon = ee.ImageCollection('projects/mapbiomas-workspace/SEEG/2023/QCN/1_Asset_v0-1')
  .select('total') //.select('c_agb'; 'c_bgb'; 'c_dw'; 'c_litter'; '...'; 'total')
  .filterMetadata('biome', 'equals', 'amazonia')
  .mosaic();
  //.clip(AOI);
// MapaddLayer
var visFlo = {min: 0,max: 200,
  palette:["#fde725","#a0da39","#4ac16d","#1fa187","#277f8e","#365c8d","#46327e","#440154"]};
Map.addLayer(data_Total_carbon, visFlo,"data_Total_carbon");
```

[Link to script - 'total' ](https://code.earthengine.google.com/e76bbf6452f9ac4f647af3db75d3173e)


[Link to script - 'c_agb'](https://code.earthengine.google.com/0656bcd6a1bfc6ae3b3ea36a16b4671c)

## Workflow
   
   Folders 📂 are organized by key-steps  ✨ and contain a set of codes {} following the *QCN  QCN_rectify* classification scheme:

1. ✨ Scripts [GEE.js](https://github.com/SEEG-Brazil/SEEG_MUT/tree/main/1._Spatial_analyses)




