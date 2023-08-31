### rasterize QCN vectors 
## edriano.souza@ipam.org.br or dhemerson.costa@ipam.org.br


## read libraries
library(sf)
library(st)
library(stars)
library(raster)
library(dplyr)

## user parameters
## path with QCN vectors 
#root <- "../vector/qcn_class"
root <-"C:/Users/edriano.souza/GitHub/2022_2_QCN_rectify_v2/Biomass_rectify_c8/Stp1_Rectify_QCN_and_C8-MapBiomas/Data_rectify_class/AOI_ALL_Biomes"

## define filename of vector to be rasterized
vector1  <- st_make_valid(read_sf(dsn= root, layer= "AOI_ALL_Biomes"))



# Coluna não concatenou legarl, utilizar coalesce e pela comentariedade criar nova coluna
vetor <- vector1 %>%
  mutate(cT_4INV = round(coalesce(c_v_4i, c__4INV),2))


vector <- st_make_valid(vetor)

## define tiles file
#tiles <- read_sf(dsn= '../vector/qcn_veg_pret', layer='tiles_biomes')
tiles <- read_sf(dsn= "C:/Users/edriano.souza/GitHub/2022_2_QCN_rectify_v2/data/shp/biomes_v0/qcn_veg_pret", 
                 layer="tiles_biomes")


## define tiles file

####### end of user parameters, don't change after this line ########
## rasterize fieldnames per tile and stack bands 
for (i in 1:nrow(tiles)) {
  print(paste0('processing tile ', i, ' from ', nrow(tiles)))
  ## read tile i
  tile_i <- tiles[i,]
  ## clip vector for the tile i
  vec_i <- st_intersection(vector, tile_i)
  ## create mask
  mask <- raster(crs=projection(vec_i), ext= extent(vec_i)); res(mask) = 0.000269494585235856472 #30m
  ## convert to stars
  mask <- st_as_stars(mask)
  
  ## rasterize each field
  #r_cagb <- st_rasterize(vec_i['c_agb'], template= mask)
  #r_cbgb <- st_rasterize(vec_i['c_bgb'], template= mask)
  #r_cdw  <- st_rasterize(vec_i['c_dw'], template= mask)
  #r_clitter <- st_rasterize(vec_i['c_littr'], template= mask)
  r_total <- st_rasterize(vec_i['cT_4INV'], template= mask)
  #r_class <- st_rasterize(vec_i['MpBm_C8'], template= mask)
  
  
  output <-"C:/Users/edriano.souza/GitHub/2022_2_QCN_rectify_v2/Biomass_rectify_c8/Stp1_Rectify_QCN_and_C8-MapBiomas/Data_rectify_class/Raster/"
  #write_stars(r_cagb, paste0(output, 'tile_', i, '_c_agb.tif'), type="Float32", drive="GTiff")
  #write_stars(r_cbgb, paste0(output, 'tile_', i, '_c_bgb.tif'), type="Float32", drive="GTiff")
  #write_stars(r_cdw, paste0(output, 'tile_', i, '_c_dw.tif'), type="Float32", drive="GTiff")
  #write_stars(r_clitter, paste0(output, 'tile_', i, '_c_litter.tif'), type="Float32", drive="GTiff")
  write_stars(r_total, paste0(output, 'tile_', i, '_cT-4INV.tif'), type="Float32", drive="GTiff")
  #write_stars(r_class, paste0(output, 'tile_', i, '_MapBiomas_C8.tif'), type="Float32", drive="GTiff")
  
  ## clean cache
  rm(tile_i, vec_i, mask, r_cagb, r_cbgb, r_cdw, r_clitter, r_total, r_class)
  gc()
  
}
