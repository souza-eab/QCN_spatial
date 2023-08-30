




##############################################

library(tidyverse)
library(readxl)
library(ggplot2)
library(dplyr)
library(sf)


folder_path <- 'Data_official'


folder_path_output <- 'Data_rectify_class'

# List of Geopackage files in the folder
gpkg_files <- list.files(folder_path, pattern = "\\.gpkg$", full.names = TRUE)

# Function for reading a Geopackage
read_gpkg <- function(file_path) {
  st_read(file_path)
}

# oad each Geopackage using lapply and assign to individual objects
for (file_path in gpkg_files) {
  gpkg_name <- tools::file_path_sans_ext(basename(file_path))  # Extracts the name without extension
  assign(gpkg_name, read_gpkg(file_path))  # Creates the object with the name of the Geopackage
  
}



# Filter and Rectify
# Relate the classes used in 'QCN' to those in 'dataiomas-C8'



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
                                             "Td"), 
                           class_mapbiomas = 3) 


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
                                                         "Rm", "Tp", "T"),12)

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


rm(list = ls())
#Write post


#---------------


### ###
## Biome Caatinga -----------------------------------------------------------
### ###

library(dplyr)
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
                                                        "SN", "Td", "TN"), 
                                 class_mapbiomas = 3) 


#Savanna
data_S <- filter_and_assign(data,
                            data$C_pretvizi %in% c("ST","Sa","Ta"), 4)

#Grassland
data_G <- filter_and_assign(data, data$C_pretvizi %in% c("Sg", "Tg", "Tp", "Pa",
                                                         "Rm", "Sp"),12)

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
                                                        "NP", "SP"),
                                 class_mapbiomas = 3)


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

