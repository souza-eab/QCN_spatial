# Goals #############

##  {
## Rotina para gerar tabelas auxiliares para relacionar as fitofisionomias
##  do IBGE como entradas da QCN para
## Retificar e classificar conforme MapBiomas-C8
##  }


# Configure R ####
gc()
memory.limit(9999999999)

### Libraries #########
library(tidyverse)
library(readxl)
library(ggplot2)
library(dplyr)
library(sf)
library(dplyr)

### Your data path #########
folder_path <- 'Data_official'
folder_path_output <- 'Data_rectify_class'


### Read sf data #########

# List of Geopackage files in the folder
gpkg_files <- list.files(folder_path, pattern = "\\.gpkg$", full.names = TRUE)

# Function for reading a Geopackage
read_gpkg <- function(file_path) {
  st_read(file_path)
}

# Load each Geopackage using lapply and assign to individual objects
for (file_path in gpkg_files) {
  gpkg_name <- tools::file_path_sans_ext(basename(file_path))  # Extracts the name without extension
  assign(gpkg_name, read_gpkg(file_path))  # Creates the object with the name of the Geopackage
  
}


##|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
# Filter and Rectify ######################
# Relate the classes used in 'QCN' to those in 'dataiomas-C8' ######################
##|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


### ###
## Biome Cerrado -----------------------------------------------------------
### ###

library(dplyr)

data <- aoi_cerrado

# Function to filter and assign (map) classes
filter_and_assign <- function(data, filter_criteria, class_mapbiomas) {
  data %>%
    filter(filter_criteria) %>%
    mutate(MapBiomas_C8 = class_mapbiomas)
}

# Apply the function to different classes and create the MapBiomas_C8 column
# Forest
data_Forest <- filter_and_assign(data,
                           data$C_pretvizi %in% c("Aa", "Ab", "As", "Ca", "Cb",
                                             "Cm", "Cs", "Da","Db", "Ds",
                                             "Fa", "Fb","Fm","Fs", "Ma", 
                                             "Ml","Mm",
                                             "ONm" ,"ONs","ONts","SMl",
                                             "SMm","P","SNb","SNm",
                                             "SNs","SNtm","SNts",
                                             "SOs","SOts","TNm", 
                                             "TNs", "TNtm", 
                                             "TNts","Sd",
                                             "Td"), 3) 


#Savanna
data_S <- filter_and_assign(data,
                         data$C_pretvizi %in% c("Sa", "Ta", "S", 
                                                     #Class contate
                                                     "ST", "STNm", "STNs", 
                                                     "STNtm", "STNts", 
                                                     "STs", "STtm", 
                                                     "STts", "STb"), 4)

#Grassland
data_G <- filter_and_assign(data, data$C_pretvizi %in% c("Eg", "Sg", "Sp", "Tg",
                                                         "Rm", "Tp", "T"), 12)

#Wetland
data_W <- filter_and_assign(data, data$C_pretvizi == "Pa", 11)

# Mangrove
data_M <- filter_and_assign(data, data$C_pretvizi == "Pf", 5)

#Dune
data_DUN <- filter_and_assign(data, data$C_pretvizi == "Dn", 23)

#Rocky
data_AR <- filter_and_assign(data, data$C_pretvizi == "Ar", 29)

# Wooded Sandbank Vegetation (Restinga)
data_Res <- filter_and_assign(data, data$C_pretvizi == "Pm", 49)

aoi_cerrado_rectify<- bind_rows(
  data_Forest,
  data_S,
  data_G,
  data_W,
  data_M,
  data_DUN,
  data_AR,
  data_Res
)

#rm(list = ls())
#Write post


##|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
##|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

### ###
## Biome Caatinga -----------------------------------------------------------
### ###
data<- aoi_caatinga

# Function to filter and assign (map) classes
filter_and_assign <- function(data, filter_criteria, class_mapbiomas) {
  data %>%
    filter(filter_criteria) %>%
    mutate(MapBiomas_C8 = class_mapbiomas)
}

# Apply the function to different classes and create the MapBiomas_C8 column
# Forest
data_Forest <- filter_and_assign(data,
                                 data$C_pretvizi %in% c("Aa" ,"Ab","Am","As",
                                                        "Ca","Cb","Cm","Cs", 
                                                        "Da" ,"Dm","Ds","Fa",
                                                        "Fb" ,"Fm","Fs","Sd",
                                                        "SN", "Td", "TN"), 3) 


#Savanna
data_S <- filter_and_assign(data,
                            data$C_pretvizi %in% c("ST","Sa","Ta"), 4)

#Grassland
data_G <- filter_and_assign(data, data$C_pretvizi %in% c("Sg", "Tg", "Tp", "Pa",
                                                         "Rm", "Sp"), 12)

# Mangrove
data_M <- filter_and_assign(data, data$C_pretvizi == "Pf", 5)

#Dune
data_DUN <- filter_and_assign(data, data$C_pretvizi == "Dn", 23)

#Rocky
data_AR <- filter_and_assign(data, data$C_pretvizi == "Ar", 29)

# Wooded Sandbank Vegetation (Restinga)
data_Res <- filter_and_assign(data, data$C_pretvizi == "Pm", 49)

aoi_caatinga_rectify<- bind_rows(
  data_Forest,
  data_S,
  data_G,
  data_M,
  data_DUN,
  data_AR,
  data_Res
)

#Write post
#rm(list = ls())



##|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
##|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


### ###
## Biome Forest Atlantic--------------------------------------------------------
### ###

library(dplyr)

data <- aoi_mat_atlantic

# Function to filter and assign (map) classes
filter_and_assign <- function(data, filter_criteria, class_mapbiomas) {
  data %>%
    filter(filter_criteria) %>%
    mutate(MapBiomas_C8 = class_mapbiomas)
}

# Apply the function to different classes and create the MapBiomas_C8 column
# Forest
data_Forest <- filter_and_assign(data,
                                 data$C_pretvizi %in% c("Aa", "Ab", "Am", "As",
                                                        "Ca", "Cb", "Cm", "Cs", 
                                                        "Da", "Db", "Dl", "Dm", 
                                                        "Ds",
                                                        "EM", "EN", 
                                                        "Fa", "Fb", "Fm", "Fs",
                                                        "Ma", "Ml", "Mm", "Ms",
                                                        "NM", "OM", "ON", "OP",
                                                        "P" , "SM", "SN", "SO", 
                                                        "TN", "D",  "F", "M", 
                                                        "NP", "SP"), 3)


#Savanna
data_S <- filter_and_assign(data,
                            data$C_pretvizi %in% c("E", "S", "ST", 
                                                   "Sa", "Sd", "Ta", "Td"), 4)

#Grassland
data_G <- filter_and_assign(data, data$C_pretvizi %in% c("Sg", "Sp", "Rl","Rm", 
                                                         "Lg",  "Eg", "L", "La",  
                                                         "T", "Tg"),12)

#Wetland
data_W <- filter_and_assign(data, data$C_pretvizi == "Pa", 11)

# Mangrove
data_M <- filter_and_assign(data, data$C_pretvizi == "Pf", 5)

#Dune
data_DUN <- filter_and_assign(data, data$C_pretvizi == "Dn", 23)

#Rocky
data_AR <- filter_and_assign(data, data$C_pretvizi == "Ar", 29)

# Wooded Sandbank Vegetation (Restinga)
data_Res <- filter_and_assign(data, data$C_pretvizi == "Pm", 49)

aoi_mat_atlantic_rectify<- bind_rows(
  data_Forest,
  data_S,
  data_G,
  data_W,
  data_M,
  data_DUN,
  data_AR,
  data_Res
)


##|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
##|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


### ###
## Biome Pantanal --------------------------------------------------------
### ###

library(dplyr)

data <- aoi_pantanal

# Function to filter and assign (map) classes
filter_and_assign <- function(data, filter_criteria, class_mapbiomas) {
  data %>%
    filter(filter_criteria) %>%
    mutate(MapBiomas_C8 = class_mapbiomas)
}

# Apply the function to different classes and create the MapBiomas_C8 column
# Forest
data_Forest <- filter_and_assign(data,
                                 data$C_pretvizi %in% c("Ca" , "Cb", "Cs", "Fa",
                                                        "Fb", "Fs", "Sd" , "Td",
                                                        "SN", "TN"), 3)
#Savanna
data_S <- filter_and_assign(data,
                            data$C_pretvizi %in% c("Ta","ST","T","Sa", "S" ), 4)

#Grassland
data_G <- filter_and_assign(data, data$C_pretvizi %in% c("Sg", "Sp"),12)

#Wetland
data_W <- filter_and_assign(data, data$C_pretvizi  %in% c("Tg", "Tp") , 11)


aoi_pantanal_rectify<- bind_rows(
  data_Forest,
  data_S,
  data_G,
  data_W
)


##|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
##|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
##|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


### ###
## Biome Pampa --------------------------------------------------------
### ###

library(dplyr)

data <- aoi_pampa

# Function to filter and assign (map) classes
filter_and_assign <- function(data, filter_criteria, class_mapbiomas) {
  data %>%
    filter(filter_criteria) %>%
    mutate(MapBiomas_C8 = class_mapbiomas)
}

# Apply the function to different classes and create the MapBiomas_C8 column
# Forest
data_Forest <- filter_and_assign(data,
                                 data$C_pretvizi %in% c("Ca", "Cb", "Cm","Cs",
                                                        "Da", "Db", "Dm", "Ds", 
                                                        "EN", "EM", "EP", "Fa", 
                                                        "Fb", "Fm", "Fs", "Ma", 
                                                        "Ms", "NM", "NP", 
                                                        "OM", "OP", "T"), 3)


#Grassland
data_G <- filter_and_assign(data, data$C_pretvizi %in% c("Eg", "Ep", "Tg", "E",
                                                         "Ea","Tp"), 12)

#Wetland
data_W <- filter_and_assign(data, data$C_pretvizi  %in% c( "P", "Pf", "Pa","Pm") , 11)


#Dune
data_DUN <- filter_and_assign(data, data$C_pretvizi == "Dn", 23)

aoi_pampa_rectify<- bind_rows(
  data_Forest,
  data_G,
  data_W,
  data_DUN
)


### Join all the biomes together and export  ###

# All biomas, except the AMAZON
AOI_ALL_Biomes <- bind_rows(
  aoi_caatinga_rectify,
  aoi_cerrado_rectify,
  aoi_mat_atlantic_rectify,
  aoi_pampa_rectify,
  aoi_pantanal_rectify
)


# Path output
output_path1 <- "Data_rectify_class/AOI_ALL_Biomes.gpkg"


##|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
# Write GPKG and ShP
##|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


# Escrever o objeto sf para o Geopackage
st_write(AOI_ALL_Biomes, dsn = output_path1, driver = "GPKG")

# Caminho de entrada (arquivo Geopackage)
input_gpkg <- "Data_rectify_class/AOI_ALL_Biomes.gpkg"

# Carregar o arquivo Geopackage
data_gpkg <- st_read(input_gpkg)

# Caminho de saída para o arquivo Shapefile (.shp)
output_shp <- "C:/Users/edriano.souza/GitHub/2022_2_QCN_rectify_v2/Biomass_rectify_c8/Stp1_Rectify_QCN_and_C8-MapBiomas/Data_rectify_class/AOI_ALL_Biomes"

AOI_ALL_Biomes_2d <- st_zm(AOI_ALL_Biomes)
# Escrever o objeto do Geopackage para o Shapefile
st_write(AOI_ALL_Biomes_2d, dsn = output_shp, driver = "ESRI Shapefile")



