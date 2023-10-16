# QCN_spatial

Based on the data available (MCTI, 2020), only one column was included. 
This column is obtained by relating the **IBGE FITO** to the **LULC classes (Mapbiomas-C8, 2023)** and generating the *'MB_C8'* column.  

The original data passed on are geopackages. To ingest it into .EE, all the biomes had to be divided into tiles. Well, like the Amazon process, it was also done using tiles.  Once the data has been processed and is available in .EE. 


## Step 0.1: 
´´´
Generate asset ´1_Asset_v0-1` join all the tiles, rasterize and export asset. Note: All biomes except the Amazon were rasterized to 30m. The Amazon Biome comes from the EBA (250m). To harmonize the asset, it was reprocessed from 250 to 30m. 

´´´

## Step 0.2: 

´´´
Generate asset ´2_Asset_v0-2` add all the tiles, rasterize and export asset. 
*All biomes except the Amazon have been rasterized to 30m. The Amazon Biome comes from the EBA (250m). To harmonize the asset, it was kept at 250 and the other biomes were kept at 30m. 

´´´
#### Note: In general, the v0-1 versions are in 30m, so v0-2 is a combination of 250m (AMZ) and 30m (all biomes). 



## Step 0.3: 

´´´
The rectification was made as follows:

3.1 Rectify pixels
With Column MB_C8, we can check 2 situations:
Where, 

´H0` - Mapbiomas and QCN agree that they are the same class maintains the stocks;

´H1` - Mapbiomas and QCN disagree that they are the same class assume values of the weighted average of phyto.

3.2 Harmonize and export;
After step 3.1, check the version condition and carry out the exports;

´´´

#### Note: In general, the rectified assets total is eg. 
´2_Asset_v0-1_rect` and depending on the compartment the desired is added. 

or +ADD compartments eg.
´3_Asset_v0-1_rect_AGB`.



## +INFO Assets QCN 

´´--- root path: 'pathprojects/mapbiomas-workspace/SEEG/2023/QCN'´´

# Assets
| Asset | Description | Scale | format | Complete path | 
| ----- | ----------- |-------|--------|---------------------------------------------|
| `0_Data_Official_tiles`       | tile files from all biomes for *rasterize (GDAL)*             | 30m   | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/0_Data_Official_tiles' 
| `0_pastVegetation_v0-1`       | tile files from biome Amazon for rasterize (.EE)              | 30m   | 'ee.Img'  | 'projects/mapbiomas-workspace/SEEG/2023/QCN/0_pastVegetation_v0-1' 
| `0_pastVegetation_v0-2`       | tile files from biome Amazon for rasterize (.EE)              | 250m  | 'ee.Img'  | 'projects/mapbiomas-workspace/SEEG/2023/QCN/0_pastVegetation_v0-2' 
| `1_Asset_v0-1`                | Official data QCN - BR                                        | 30m   | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/1_Asset_v0-1' 
| `1_Asset_v0-2`                | Official data QCN - BR                                        | 250m  | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/1_Asset_v0-2' 
| `2_Asset_v0-1_rect`           | Official data ('QCN-BR') rectified by weighted average ´FITO´ | 30m   | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/2_Asset_v0-1_rect' 
| `2_Asset_v0-2_rect`           | Official data ('QCN-BR') rectified by weighted average ´FITO´ | 250m & 30m  | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/2_Asset_v0-2_rect' 
| `3_Asset_v0-1_rect_AGB`       | .........                rectified AGB by weighted average ´FITO´ | 30m   | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/3_Asset_v0-1_rect_AGB' 
| `3_Asset_v0-1_rect_BGB`       | .........                rectified BGB by weighted average ´FITO´ | 30m   | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/3_Asset_v0-1_rect_BGB'
| `3_Asset_v0-1_rect_CDW`       | .........                rectified CDW by weighted average ´FITO´ | 30m   | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/3_Asset_v0-1_rect_CDW'
| `3_Asset_v0-1_rect_LIT`       | .........                rectified LIT by weighted average ´FITO´ | 30m   | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/3_Asset_v0-1_rect_LIT'
| `4_Asset_v0-2_rect_AGB`       | .........                rectified AGB by weighted average ´FITO´ | 250 & 30m | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/4_Asset_v0-2_rect_AGB' 
| `4_Asset_v0-2_rect_BGB`       | .........                rectified BGB by weighted average ´FITO´ | 250 & 30m | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/4_Asset_v0-2_rect_BGB'
| `4_Asset_v0-2_rect_CDW`       | .........                rectified CDW by weighted average ´FITO´ | 250 & 30m | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/4_Asset_v0-2_rect_CDW'
| `4_Asset_v0-2_rect_LIT`       | .........                rectified LIT by weighted average ´FITO´ | 250 & 30m | 'ee.ImgC' | 'projects/mapbiomas-workspace/SEEG/2023/QCN/4_Asset_v0-2_rect_LIT'


# *Expect biome AMZ*
