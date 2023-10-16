// Rectify 'AGB | BGB | CW | Litter' of QCN per native vegetation classe by using Mapbiomas Collection 8.0 LCLUC as reference  
// For any issue/bug, please write to <edriano.souza@ipam.org.br> and/or <barbara.zimbres@ipam.org.br>
// SEEG/Observatório do Clima and IPAM
// Current version: 2.0

// @ UPDATE HISTORIC @ //
// 1:  Compute number of divergences by comparing qcn past vegetation and mapbiomas 8.0 (per year)
// 1.1 Perform 'AGB | BGB | CW | Litter' correction for the Cerrado biome (1985) 
// 1.2 Perform 'AGB | BGB | CW | Litter' correction for the Cerrado biome from 1985 to 2022 (cumulative and static)
// 2.0 Perform 'AGB | BGB | CW | Litter' correction for all biomes from 1985 to 2022 (Static)
// 2.1 Incluir todos os compartimentos (ligar e desligar comentários e rodar 1compartimento por vez)

//* @ Set user parameters *//
// var dir_output = 'projects/mapbiomas-workspace/SEEG/2023/QCN/2_Asset_v0-1_rect';
// var dir_output = 'projects/mapbiomas-workspace/SEEG/2023/QCN/2_Asset_v0-2_rect';

//AGB
//var dir_output = 'projects/mapbiomas-workspace/SEEG/2023/QCN/3_Asset_v0-1_rect_AGB' // 30 m
//var dir_output = 'projects/mapbiomas-workspace/SEEG/2023/QCN/4_Asset_v0-2_rect_AGB' // 250m (EBA-Amz) | 30m (Others biomes)


//BGB
//var dir_output = 'projects/mapbiomas-workspace/SEEG/2023/QCN/3_Asset_v0-1_rect_BGB' // 30 m
//var dir_output = 'projects/mapbiomas-workspace/SEEG/2023/QCN/4_Asset_v0-2_rect_BGB' // 250m (EBA-Amz) | 30m (Others biomes)


//CDW
//var dir_output = 'projects/mapbiomas-workspace/SEEG/2023/QCN/3_Asset_v0-1_rect_CDW' // 30 m
//var dir_output = 'projects/mapbiomas-workspace/SEEG/2023/QCN/4_Asset_v0-2_rect_CDW' // 250m (EBA-Amz) | 30m (Others biomes)


//LITTER
//var dir_output = 'projects/mapbiomas-workspace/SEEG/2023/QCN/3_Asset_v0-1_rect_LIT' // 30 m
var dir_output = 'projects/mapbiomas-workspace/SEEG/2023/QCN/4_Asset_v0-2_rect_LIT' // 250m (EBA-Amz) | 30m (Others biomes)


var version = '2-1';
//var version = '0-2';

// define biomes to be processed
// to process a single biome, comment lines 
var list_biomes = [1, // amazonia
                   2, // mata atlantica
                   3, // pantanal
                   4, // cerrado
                   5, // caatinga
                   6 // pampa
                   ];

// define years to be processed 
var list_mapb_years = [1985 
                      //1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997,
                      //1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
                       //2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022
                       ];
                       
// define QCN classes to be rectified
var list_qcn_classes = [3,  // Forest formation
                        4,  // Savanna formation 
                        5,  // Mangrove
                        6,  // Floodable Forest (beta)
                        11, // Wetland
                        12, // Grassland 
                        49, // Wooded Restinga
                        50]; // Shrubby Restinga //*BZ


// define mapbiomas colelction 8.0 reclassification matrix
// var raw_mapbiomas  = [3, 4, 5, 6,  9, 11, 12, 13, 15, 20, 21, 23, 24, 25, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49, 50, 62];   //*BZ
// var reclass_vector = [3, 4, 5, 6,  0, 11, 12,  13,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 0,  0,  0,  0,  0,  0, 49, 50, 0];   //*BZ
var raw_mapbiomas  = [3, 4, 5, 6,  9, 11, 12, 13, 15, 20, 21, 23, 24, 25, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49, 50, 62];   //*Edriano
var reclass_vector = [3, 4, 5, 6,  0, 11, 12, 13,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 49, 50,  0];   //*Edriano

// import QCN data
//var qcn = ee.ImageCollection('projects/mapbiomas-workspace/SEEG/2023/QCN/1_Asset_v0-1')
  //.mosaic(); 

var qcn = ee.ImageCollection('projects/mapbiomas-workspace/SEEG/2023/QCN/1_Asset_v0-2')
  .mosaic(); 
            
// import biomes raster
var biomes = ee.Image('projects/mapbiomas-workspace/AUXILIAR/biomas-2019-raster'); //* ok

// import states raster
var states = ee.Image('projects/mapbiomas-workspace/AUXILIAR/estados-2016-raster'); //* ok
//Map.addLayer(states)
// import Mapbiomas Collection 7.0
//var colecao7 = ee.Image("projects/mapbiomas-workspace/public/collection7/mapbiomas_collection70_integration_v2"); //* ok
// import Mapbiomas Collection 8.0
var colecao8 = ee.Image("projects/mapbiomas-workspace/public/collection8/mapbiomas_collection80_integration_v1"); //* ok


///////////////////////////////////////
/* @. Don't change below this line *///
///////////////////////////////////////


// get color-ramp module
var vis = {
    'min': 0,
    'max': 62,  //*BZ
    'palette': require('users/mapbiomas/modules:Palettes.js').get('classification8')  //*ok
};

// pre-definied palletes
var palt = require('users/gena/packages:palettes').matplotlib.viridis[7];
var pala = require('users/gena/packages:palettes').kovesi.rainbow_bgyr_35_85_c72[7];

// read products
var qcn_class = qcn.select(['MB_C8']);
//var qcn_c_agb = qcn.select(['c_agb']);
//var qcn_c_bgb = qcn.select(['c_bgb']);
//var qcn_c_dw = qcn.select(['c_dw']);
var qcn_c_litter = qcn.select(['c_litter']);


// plot inspects
//Map.addLayer(qcn_class, vis, 'QCN_Class_MB_C8');
//Map.addLayer(qcn_c_bgb, {min: 0, max: 168, palette: palt}, 'QCN_c_bgb');

// for each biome
list_biomes.forEach(function(biome_i) {
  // define raw 'c_x' for the biome [i]
  var biome_tot = qcn_c_litter.updateMask(biomes.eq(biome_i));
  // subset 'qcnclass' for the biome [i]
  var qcn_class_i = qcn_class.updateMask(biomes.eq(biome_i));
  //Map.addLayer(biome_tot, {min: 0, max: 168, palette: palt}, 'tot' + ' '+ biome_i );
  //Map.addLayer(qcn_class_i, vis , 'class biome' + ' '+ biome_i );
  
  
  // create empty recipes
  var image_static = ee.Image([]);
  var temp = ee.Image([]);
  var biome_name;
  
  // for each year
  list_mapb_years.forEach(function(year_j) {
    // subset mapbiomas collection 6.0 for the biome [i] and year [j]
    var mapbiomas_ij = colecao8.select(['classification_' + year_j])
                               .updateMask(biomes.eq(biome_i));
    
    // reclassify mapbiomas by using the obj 'reclass_vector' as general rule
    var mapbiomas_reclass_ij = mapbiomas_ij.remap(raw_mapbiomas, reclass_vector);
    //Map.addLayer(mapbiomas_reclass_ij, vis, biome_i + ' ' + year_j + ' ' + 'reclass');
    
    // for each QCN class
    list_qcn_classes.forEach(function(class_k) {
      //print (biome_i + ' ' + year_j + ' ' + class_k);
      // subset qcn classesonly to class [k]
      var qcn_class_ik = qcn_class_i.updateMask(qcn_class_i.eq(class_k));
      //Map.addLayer(qcn_class_ik, vis, 'qcn' + ' ' + class_k);
      
      // mask mapbiomas for biome [i] and year [j] for the qcn class [k]
      var mapbiomas_reclass_ijk= mapbiomas_reclass_ij.updateMask(qcn_class_ik);
      //Map.addLayer(mapbiomas_reclass_ijk, vis, 'mapbiomas' + ' when qcn == ' + class_k);
      
      // compute discordances between qcn and mapbiomas
      var discordance_ijk = mapbiomas_reclass_ijk.updateMask(mapbiomas_reclass_ijk.neq(class_k));
      //Map.addLayer(discordance_ijk, vis, 'discordance' + ' when qcn == ' + class_k);
      
      // perform the correction of 'c_c_dw' for the biome [i], year [j] and class [k]
      // when biome equals amazonia
      
      // AGB
      //if (biome_i == 1) {
      //  biome_name = 'amazonia';  //Check this 09/10, OK                                            
      //  var tot_rect = biome_tot.where(discordance_ijk.eq(3), 20.72);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(4),  53.16);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(5),  25.80); 
      //      tot_rect = tot_rect.where(discordance_ijk.eq(6),  20.72);  // equal class forest (3) //not include em .csv           
      //      tot_rect = tot_rect.where(discordance_ijk.eq(11), 38.40);       
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12), 30.92);  
      //} // Amazonia conferida
      //
      //// when biome equals to mata atlantica
      //if (biome_i == 2) {
      //  biome_name = 'mata_atlantica';  //Check this 09/10, OK
      //  var tot_rect = biome_tot.where(discordance_ijk.eq(3), 92.45);   
      //      tot_rect = tot_rect.where(discordance_ijk.eq(4),  24.84);     
      //      tot_rect = tot_rect.where(discordance_ijk.eq(5),  62.42);        
      //      tot_rect = tot_rect.where(discordance_ijk.eq(6),  92.45);  // equal class forest (3) //not include em .csv                                                
      //      tot_rect = tot_rect.where(discordance_ijk.eq(11), 78.54);       
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12), 2.63);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(13), 62.42); 
      //      tot_rect = tot_rect.where(discordance_ijk.eq(49), 79.71);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(50), 79.71);  // equal class forest (49) //not include em .csv         
      //} // MA conferida
      //
      //// when biome equals to pantanal
      //if (biome_i == 3) {
      //  biome_name = 'pantanal';   //Check this 09/10, OK
      //  var tot_rect = biome_tot.where(discordance_ijk.eq(3), 82.75);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(4),  13.55);       
      //      tot_rect = tot_rect.where(discordance_ijk.eq(6),  82.75);  // equal class forest (3) //not include em .csv                                            
      //      tot_rect = tot_rect.where(discordance_ijk.eq(11), 6.68);
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12), 5.95);    
      //      tot_rect = tot_rect.where(discordance_ijk.eq(13), 6.68);  //*BZ   // equal class forest (11) //not include em .csv       
      //} 
      //
      //// when biome equals to cerrado
      //if (biome_i == 4) {
      //  biome_name = 'cerrado';   //Check this 09/10, OK
      //  // when discordance equal to forest formation           
      //  var tot_rect = biome_tot.where(states.eq(11).and(discordance_ijk.eq(3)), 51.09519632);      // RO // Falta dado e colocamos a média geral da UFs //*BZ
      //      tot_rect = tot_rect.where(states.eq(15).and(discordance_ijk.eq(3)),  49.69692342);      // PA OK
      //      tot_rect = tot_rect.where(states.eq(17).and(discordance_ijk.eq(3)),  45.41707464);      // TO OK
      //      tot_rect = tot_rect.where(states.eq(21).and(discordance_ijk.eq(3)),  41.67536965);      // MA OK
      //      tot_rect = tot_rect.where(states.eq(22).and(discordance_ijk.eq(3)),  40.48964273);      // PI OK
      //      tot_rect = tot_rect.where(states.eq(29).and(discordance_ijk.eq(3)),  41.02542625);      // BA OK
      //      tot_rect = tot_rect.where(states.eq(31).and(discordance_ijk.eq(3)),  43.30993279);      // MG OK
      //      tot_rect = tot_rect.where(states.eq(35).and(discordance_ijk.eq(3)),  54.33923594);      // SP OK
      //      tot_rect = tot_rect.where(states.eq(41).and(discordance_ijk.eq(3)),  50.12589671);      // PR OK
      //      tot_rect = tot_rect.where(states.eq(50).and(discordance_ijk.eq(3)),  67.34418465);      // MS OK
      //      tot_rect = tot_rect.where(states.eq(51).and(discordance_ijk.eq(3)),  65.8869862);       // MT OK
      //      tot_rect = tot_rect.where(states.eq(52).and(discordance_ijk.eq(3)),  43.30821719);      // GO OK
      //      tot_rect = tot_rect.where(states.eq(53).and(discordance_ijk.eq(3)),  47.8176185);       // DF OK
      //      
      //  // when discordance equal to other types of NV   // Diff Version                                
      //      tot_rect = tot_rect.where(discordance_ijk.eq(4),   12.39);                              
      //      tot_rect = tot_rect.where(discordance_ijk.eq(5),   25.83); //*BZ                           
      //      tot_rect = tot_rect.where(discordance_ijk.eq(11),  25.64);                              
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12),   1.06);                               
      //      tot_rect = tot_rect.where(discordance_ijk.eq(49),  23.46); //*BZ                              
      //      tot_rect = tot_rect.where(discordance_ijk.eq(50),  23.46); //*BZ // equal class forest (49) //not include em .csv 
      //}
      //
      //// when biome equal to caatinga
      //if (biome_i == 5) { 
      //  biome_name = 'caatinga';    //Check this 09/10, OK
      //  var tot_rect = biome_tot.where(discordance_ijk.eq(3), 43.04);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(4),  9.97);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(5),  123.08);  
      //      // tot_rect = tot_rect.where(discordance_ijk.eq(6),  43.04);        //equal class 3                                    
      //     // tot_rect = tot_rect.where(discordance_ijk.eq(11), 36.21); //?
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12), 6.33);  
      //      //tot_rect = tot_rect.where(discordance_ijk.eq(13), 83.06);//?
      //      tot_rect = tot_rect.where(discordance_ijk.eq(49), 101.61); 
      //      tot_rect = tot_rect.where(discordance_ijk.eq(50), 101.61); //*BZ // equal class forest (49) //not include em .csv 
      //} // Class 11 e 13  not fitofisionomias.xls
      //
      //// when biome equal to pampa
      //if (biome_i == 6) {
      //  biome_name = 'pampa';
      //  var tot_rect = biome_tot.where(discordance_ijk.eq(3), 52.92);   
      //      // tot_rect = tot_rect.where(discordance_ijk.eq(5),  12.77);  
      //      //tot_rect = tot_rect.where(discordance_ijk.eq(6), 52.92);                                                   
      //      tot_rect = tot_rect.where(discordance_ijk.eq(11), 1.03);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12), 11.54);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(49), 1.03); 
      //      tot_rect = tot_rect.where(discordance_ijk.eq(50), 1.03); //*BZ // equal class forest (49) //not include em .csv 
      //} 


      ///////////////////////////////////////////////////////////////////////////////////////////////////////
      // BGB 
      /////////////////////////////////////////////////////////////////////////////////////////////////////
      //if (biome_i == 1) {
      //  biome_name = 'amazonia';                                    // Check this 10/10, OK                                              
      //  var tot_rect = biome_tot.where(discordance_ijk.eq(3),  44.42);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(4),  109.26);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(5),    9.60);
      //      tot_rect = tot_rect.where(discordance_ijk.eq(6),   44.42); // equal class forest (3) //not include em .csv            
      //      tot_rect = tot_rect.where(discordance_ijk.eq(11),  14.20);       
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12),  73.85);  
      //} // 
      //
      //// when biome equals to mata atlantica
      //if (biome_i == 2) {
      //  biome_name = 'mata_atlantica';                                 // Check this 10/10, OK     
      //  var tot_rect = biome_tot.where(discordance_ijk.eq(3), 21.88);   
      //      tot_rect = tot_rect.where(discordance_ijk.eq(4),  15.67);     
      //      tot_rect = tot_rect.where(discordance_ijk.eq(5),  14.67);        
      //      tot_rect = tot_rect.where(discordance_ijk.eq(6),  21.88);  // equal class forest (3) //not include em .csv                                                  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(11), 18.46);       
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12),  8.74);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(13), 14.67);       // equal class 5
      //      tot_rect = tot_rect.where(discordance_ijk.eq(49), 18.73);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(50), 18.73);  //*BZ // equal class forest (49) //not include em .csv 
      //} // 
      //
      //// when biome equals to pantanal
      //if (biome_i == 3) {
      //  biome_name = 'pantanal';                                      // Check this 10/10, OK     
      //  var tot_rect = biome_tot.where(discordance_ijk.eq(3), 18.55);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(4),  21.87);       
      //      tot_rect = tot_rect.where(discordance_ijk.eq(6),  18.55); // equal class forest (3) //not include em .csv                                              
      //      tot_rect = tot_rect.where(discordance_ijk.eq(11), 17.05);
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12), 16.14);    
      //      //tot_rect = tot_rect.where(discordance_ijk.eq(13), 17.05); //*BZ    // equal class 11
      //} // 11 e 12 inversão
      //
      //// when biome equals to cerrado
      //if (biome_i == 4) {
      //  biome_name = 'cerrado';                                                               // Check this 10/10, OK    
      //  // when discordance equal to forest formation           
      //  var tot_rect = biome_tot.where(states.eq(11).and(discordance_ijk.eq(3)), 13.70764591 );     // RO // Falta dado e colocamos a média geral da UFs //*BZ
      //      tot_rect = tot_rect.where(states.eq(15).and(discordance_ijk.eq(3)),  13.01829324);      // PA
      //      tot_rect = tot_rect.where(states.eq(17).and(discordance_ijk.eq(3)),  12.04954015);      // TO 
      //      tot_rect = tot_rect.where(states.eq(21).and(discordance_ijk.eq(3)),  11.46403431);      // MA 
      //      tot_rect = tot_rect.where(states.eq(22).and(discordance_ijk.eq(3)),  12.06534843);      // PI 
      //      tot_rect = tot_rect.where(states.eq(29).and(discordance_ijk.eq(3)),  12.15628228);      // BA 
      //      tot_rect = tot_rect.where(states.eq(31).and(discordance_ijk.eq(3)),  12.1240573);       // MG 
      //      tot_rect = tot_rect.where(states.eq(35).and(discordance_ijk.eq(3)),  13.9712752);       // SP 
      //      tot_rect = tot_rect.where(states.eq(41).and(discordance_ijk.eq(3)),  13.27649275);      // PR 
      //      tot_rect = tot_rect.where(states.eq(50).and(discordance_ijk.eq(3)),  16.86113548);      // MS 
      //      tot_rect = tot_rect.where(states.eq(51).and(discordance_ijk.eq(3)),  16.95780156);      // MT 
      //      tot_rect = tot_rect.where(states.eq(52).and(discordance_ijk.eq(3)),  12.11797312);      // GO 
      //      tot_rect = tot_rect.where(states.eq(53).and(discordance_ijk.eq(3)),  12.98650336);      // DF 
      //      
      //  // when discordance equal to other types of NV   // Diff Version                     // Check this 10/10, OK    
      //      tot_rect = tot_rect.where(discordance_ijk.eq(4),  24.11);                              
      //      tot_rect = tot_rect.where(discordance_ijk.eq(5),    9.55); //*BZ                           
      //      tot_rect = tot_rect.where(discordance_ijk.eq(11),   7.28);                              
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12),   3.55);                               
      //      tot_rect = tot_rect.where(discordance_ijk.eq(49),   8.68); //*BZ                              
      //      tot_rect = tot_rect.where(discordance_ijk.eq(50),   8.68); //*BZ
      //}
      //
      //// when biome equal to caatinga
      //if (biome_i == 5) {
      //  biome_name = 'caatinga';                                                              // Check this 10/10, OK    
      //  var tot_rect = biome_tot.where(discordance_ijk.eq(3), 14.51);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(4),   7.30);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(5),  37.75);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(6),  14.51);            // equal class forest (3) //not include em .csv                                          
      //      // tot_rect = tot_rect.where(discordance_ijk.eq(11), ); //?
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12), 8.44);  
      //      //tot_rect = tot_rect.where(discordance_ijk.eq(13), );//?
      //      tot_rect = tot_rect.where(discordance_ijk.eq(49), 21.89); 
      //      tot_rect = tot_rect.where(discordance_ijk.eq(50), 21.89); //*BZ // equal class forest (49) //not include em .csv 
      //} // Class 11 e 13  not fitofisionomias.xls
      //
      //// when biome equal to pampa
      //if (biome_i == 6) {
      //  biome_name = 'pampa';                                                              // Check this 10/10, OK    
      //  var tot_rect = biome_tot.where(discordance_ijk.eq(3), 14.18);   
      //      // tot_rect = tot_rect.where(discordance_ijk.eq(5),  12.77); // No have  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(6),  14.18);           // equal class forest (3) //not include em .csv                                                       
      //      tot_rect = tot_rect.where(discordance_ijk.eq(11),  8.35);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12),  5.70);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(49), 10.15); 
      //      tot_rect = tot_rect.where(discordance_ijk.eq(50), 10.15); //*BZ // equal class forest (49) 
      //} // 49 e 50 include Babi
      
      
      /////////////////////////////////////////////////////////////////////////////////////////////////////
      // C_DW
      /////////////////////////////////////////////////////////////////////////////////////////////////////

      //if (biome_i == 1) {
      //  biome_name = 'amazonia';                                                            // Check this 10/10, OK 
      //  var tot_rect = biome_tot.where(discordance_ijk.eq(3),  11.03);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(4),    0.21);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(5),    2.80); 
      //      tot_rect = tot_rect.where(discordance_ijk.eq(6),   11.03);           // equal class forest (3) //not include em .csv       
      //      tot_rect = tot_rect.where(discordance_ijk.eq(11),   4.20);       
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12),   0.49);  
      //} // 
      //
      //// when biome equals to mata atlantica
      //if (biome_i == 2) {
      //  biome_name = 'mata_atlantica';                                          // Check this 10/10, OK 
      //  var tot_rect = biome_tot.where(discordance_ijk.eq(3), 3.29);   
      //      tot_rect = tot_rect.where(discordance_ijk.eq(4),  2.80);     
      //      tot_rect = tot_rect.where(discordance_ijk.eq(5),  2.98);        
      //      tot_rect = tot_rect.where(discordance_ijk.eq(6),  3.29);            // equal class forest (3) //not include em .csv                                           
      //      tot_rect = tot_rect.where(discordance_ijk.eq(11), 2.98);       
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12), 0.47);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(13), 2.98);            // equal class 5
      //      tot_rect = tot_rect.where(discordance_ijk.eq(49), 2.98);  
      //      //tot_rect = tot_rect.where(discordance_ijk.eq(50), 2.98);       
      //} // 
      //
      //// when biome equals to pantanal
      //if (biome_i == 3) {
      //  biome_name = 'pantanal';                                               // Check this 10/10, OK   
      //  var tot_rect = biome_tot.where(discordance_ijk.eq(3), 8.97);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(4),  1.75);       
      //      tot_rect = tot_rect.where(discordance_ijk.eq(6),  8.97);           // equal class forest (3) //not include em .csv                                      
      //      tot_rect = tot_rect.where(discordance_ijk.eq(11), 0.05);
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12), 0.04);    
      //      tot_rect = tot_rect.where(discordance_ijk.eq(13), 0.04);         //*BZ   Equal - Class12
      //} 
      //
      //// when biome equals to cerrado
      //if (biome_i == 4) {
      //  biome_name = 'cerrado';                                                // Check this 10/10, OK   
      //  // when discordance equal to forest formation           
      //  var tot_rect = biome_tot.where(states.eq(11).and(discordance_ijk.eq(3)), 5.265697147);      // RO // Falta dado e colocamos a média geral da UFs //*BZ
      //      tot_rect = tot_rect.where(states.eq(15).and(discordance_ijk.eq(3)),  5.090127638);      // PA
      //      tot_rect = tot_rect.where(states.eq(17).and(discordance_ijk.eq(3)),  4.504146917);      // TO 
      //      tot_rect = tot_rect.where(states.eq(21).and(discordance_ijk.eq(3)),  4.526216838);      // MA 
      //      tot_rect = tot_rect.where(states.eq(22).and(discordance_ijk.eq(3)),  4.53712416);       // PI 
      //      tot_rect = tot_rect.where(states.eq(29).and(discordance_ijk.eq(3)),  4.598862162);      // BA 
      //      tot_rect = tot_rect.where(states.eq(31).and(discordance_ijk.eq(3)),  4.453195378);      // MG 
      //      tot_rect = tot_rect.where(states.eq(35).and(discordance_ijk.eq(3)),  5.150887277);      // SP 
      //      tot_rect = tot_rect.where(states.eq(41).and(discordance_ijk.eq(3)),  5.004357387);      // PR 
      //      tot_rect = tot_rect.where(states.eq(50).and(discordance_ijk.eq(3)),  6.789604999);      // MS 
      //      tot_rect = tot_rect.where(states.eq(51).and(discordance_ijk.eq(3)),  6.666008136);      // MT 
      //      tot_rect = tot_rect.where(states.eq(52).and(discordance_ijk.eq(3)),  4.451804033);      // GO 
      //      tot_rect = tot_rect.where(states.eq(53).and(discordance_ijk.eq(3)),  4.905880203);      // DF 
      //      
      //  // when discordance equal to other types of NV   // Diff Version                                
      //      tot_rect = tot_rect.where(discordance_ijk.eq(4),    1.72);                              
      //      tot_rect = tot_rect.where(discordance_ijk.eq(5),    2.84);                               
      //      tot_rect = tot_rect.where(discordance_ijk.eq(11),   2.29);                              
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12),   0.00);                               
      //      tot_rect = tot_rect.where(discordance_ijk.eq(49),   2.58);                     
      //      tot_rect = tot_rect.where(discordance_ijk.eq(50),   2.58); //*BZ
      //}
      //
      //// when biome equal to caatinga
      //if (biome_i == 5) {
      //  biome_name = 'caatinga';                                                // Check this 10/10, OK  
      //  var tot_rect = biome_tot.where(discordance_ijk.eq(3), 6.04);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(4),  1.31);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(5),  9.53);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(6),  6.04);            //equal class 3                                    
      //     // tot_rect = tot_rect.where(discordance_ijk.eq(11), ); //?
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12), 0.26);  
      //      //tot_rect = tot_rect.where(discordance_ijk.eq(13), );//?
      //      tot_rect = tot_rect.where(discordance_ijk.eq(49), 22.18); 
      //      tot_rect = tot_rect.where(discordance_ijk.eq(50), 22.18); //*BZ equal 49
      //} // Class 11 e 13  not fitofisionomias.xls
      //
      //// when biome equal to pampa
      //if (biome_i == 6) {
      //  biome_name = 'pampa';                                                // Check this 10/10, OK  
      //  var tot_rect = biome_tot.where(discordance_ijk.eq(3),  5.81);   
      //      // tot_rect = tot_rect.where(discordance_ijk.eq(5), ); // No 
      //      tot_rect = tot_rect.where(discordance_ijk.eq(6),   5.81); // no                                            
      //      tot_rect = tot_rect.where(discordance_ijk.eq(11),  0.0);  //*BZ
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12),  1.28);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(49),  0.0); //*BZ
      //      tot_rect = tot_rect.where(discordance_ijk.eq(50),  0.0); //*BZ
      //} // 49 e 50 include Babi
      
      
      /////////////////////////////////////////////////////////////////////////////////////////////////////
      // Litter
      /////////////////////////////////////////////////////////////////////////////////////////////////////
      //  Litter - Em desenvolvimento
      
      if (biome_i == 1) {
        biome_name = 'amazonia';                                                // Check this 10/10, OK  
        var tot_rect = biome_tot.where(discordance_ijk.eq(3),   6.35);  
            tot_rect = tot_rect.where(discordance_ijk.eq(4),    2.86);  
            tot_rect = tot_rect.where(discordance_ijk.eq(5),    0.04); 
            tot_rect = tot_rect.where(discordance_ijk.eq(6),    6.35);          // equal class 3            
            tot_rect = tot_rect.where(discordance_ijk.eq(11),   1.40);       
            tot_rect = tot_rect.where(discordance_ijk.eq(12),   5.13);  
      } // 
      
      // when biome equals to mata atlantica
      if (biome_i == 2) {
        biome_name = 'mata_atlantica';                                         // Check this 10/10, OK  
        var tot_rect = biome_tot.where(discordance_ijk.eq(3), 4.16);   
            tot_rect = tot_rect.where(discordance_ijk.eq(4),  4.33);     
            tot_rect = tot_rect.where(discordance_ijk.eq(5),  2.99);        
            tot_rect = tot_rect.where(discordance_ijk.eq(6),  4.16);          // equal class 3                                                
            tot_rect = tot_rect.where(discordance_ijk.eq(11), 3.77);       
            tot_rect = tot_rect.where(discordance_ijk.eq(12), 2.07);  
            tot_rect = tot_rect.where(discordance_ijk.eq(13), 2.99);       
            tot_rect = tot_rect.where(discordance_ijk.eq(49), 3.28);  
            //tot_rect = tot_rect.where(discordance_ijk.eq(50), 3.28);      
      } // 
      
      // when biome equals to pantanal
      if (biome_i == 3) {
        biome_name = 'pantanal';                                              // Check this 10/10, OK 
        var tot_rect = biome_tot.where(discordance_ijk.eq(3), 8.51);  
            tot_rect = tot_rect.where(discordance_ijk.eq(4),  2.67);       
            tot_rect = tot_rect.where(discordance_ijk.eq(6),  8.51);         // not exist - equal class 3                                                
            tot_rect = tot_rect.where(discordance_ijk.eq(11), 1.43);        
            tot_rect = tot_rect.where(discordance_ijk.eq(12), 1.12);    
            //tot_rect = tot_rect.where(discordance_ijk.eq(13), 17.05); //*BZ   Não tem 
      } 
      
      // when biome equals to cerrado
      if (biome_i == 4) {
        biome_name = 'cerrado';                                               // Check this 10/10, OK 
        // when discordance equal to forest formation           
        var tot_rect = biome_tot.where(states.eq(11).and(discordance_ijk.eq(3)), 9.190077821);      // RO // Falta dado e colocamos a média geral da UFs //*BZ
            tot_rect = tot_rect.where(states.eq(15).and(discordance_ijk.eq(3)),  6.230528829);      // PA
            tot_rect = tot_rect.where(states.eq(17).and(discordance_ijk.eq(3)),  5.377941281);      // TO 
            tot_rect = tot_rect.where(states.eq(21).and(discordance_ijk.eq(3)),  5.025518217);      // MA 
            tot_rect = tot_rect.where(states.eq(22).and(discordance_ijk.eq(3)),  4.654998231);      // PI 
            tot_rect = tot_rect.where(states.eq(29).and(discordance_ijk.eq(3)),  4.739943403);      // BA 
            tot_rect = tot_rect.where(states.eq(31).and(discordance_ijk.eq(3)),  4.847654758);      // MG 
            tot_rect = tot_rect.where(states.eq(35).and(discordance_ijk.eq(3)),  6.989533074);      // SP 
            tot_rect = tot_rect.where(states.eq(41).and(discordance_ijk.eq(3)),  6.397629996);      // PR 
            tot_rect = tot_rect.where(states.eq(50).and(discordance_ijk.eq(3)),  20.00623629);      // MS 
            tot_rect = tot_rect.where(states.eq(51).and(discordance_ijk.eq(3)),  19.76152458);      // MT 
            tot_rect = tot_rect.where(states.eq(52).and(discordance_ijk.eq(3)),  4.847194906);      // GO 
            tot_rect = tot_rect.where(states.eq(53).and(discordance_ijk.eq(3)),  8.660535904);      // DF 
            
        // when discordance equal to other types of NV   // Diff Version                                
            tot_rect = tot_rect.where(discordance_ijk.eq(4),    3.09);                              
            tot_rect = tot_rect.where(discordance_ijk.eq(5),    0.04);                               
            tot_rect = tot_rect.where(discordance_ijk.eq(11),   1.00);                              
            tot_rect = tot_rect.where(discordance_ijk.eq(12),   0.10);                               
            tot_rect = tot_rect.where(discordance_ijk.eq(49),   0.04);                     
            tot_rect = tot_rect.where(discordance_ijk.eq(50),   0.04);   //*BZ
      }
      
      // when biome equal to caatinga
      if (biome_i == 5) {
        biome_name = 'caatinga';                                              // Check this 10/10, OK 
        var tot_rect = biome_tot.where(discordance_ijk.eq(3), 4.94);  
            tot_rect = tot_rect.where(discordance_ijk.eq(4),  1.71);  
            tot_rect = tot_rect.where(discordance_ijk.eq(5),  0.18);  
            tot_rect = tot_rect.where(discordance_ijk.eq(6),  4.94);    //no     //equal class 3                                    
           // tot_rect = tot_rect.where(discordance_ijk.eq(11), ); //?
            tot_rect = tot_rect.where(discordance_ijk.eq(12), 0.42);  
            //tot_rect = tot_rect.where(discordance_ijk.eq(13), );//?
            tot_rect = tot_rect.where(discordance_ijk.eq(49), 1.41); 
            tot_rect = tot_rect.where(discordance_ijk.eq(50), 1.41); //no //*BZ equal 49
      } // Class 11 e 13  not fitofisionomias.xls
      
      // when biome equal to pampa
      if (biome_i == 6) {
        biome_name = 'pampa';                                                // Check this 10/10, OK 
        var tot_rect = biome_tot.where(discordance_ijk.eq(3),   3.12);   
            // tot_rect = tot_rect.where(discordance_ijk.eq(5), ); // No 
            tot_rect = tot_rect.where(discordance_ijk.eq(6),    3.12); // no                                            
            tot_rect = tot_rect.where(discordance_ijk.eq(11),   2.27);  //*BZ
            tot_rect = tot_rect.where(discordance_ijk.eq(12),   3.32);  
            tot_rect = tot_rect.where(discordance_ijk.eq(49),   1.59); //*BZ
            tot_rect = tot_rect.where(discordance_ijk.eq(50),   1.59); //*BZ
      } // 49 e 50 include Babi

      // bind corrections of each class into a unique 'temp' obj 
      if (class_k == 3) {
        temp = tot_rect;
      }
      if (class_k == 4) {
        temp = temp.blend(tot_rect.updateMask(qcn_class_i.eq(class_k)));
      }
      if (class_k == 5) {
        temp = temp.blend(tot_rect.updateMask(qcn_class_i.eq(class_k)));
      }
      if (class_k == 6) {
        temp = temp.blend(tot_rect.updateMask(qcn_class_i.eq(class_k)));
      }
      if (class_k == 11) {
        temp = temp.blend(tot_rect.updateMask(qcn_class_i.eq(class_k)));
      }
      if (class_k == 12) {
        temp = temp.blend(tot_rect.updateMask(qcn_class_i.eq(class_k)));
      }
      if (class_k == 13) {
        temp = temp.blend(tot_rect.updateMask(qcn_class_i.eq(class_k)));
      }
      if (class_k == 49) {
        temp = temp.blend(tot_rect.updateMask(qcn_class_i.eq(class_k)));
      }
      if (class_k == 50) {
        temp = temp.blend(tot_rect.updateMask(qcn_class_i.eq(class_k)));
      
      // rename band
      temp = temp.rename('c_litter_' + year_j);

      // insert into recipe
      image_static = image_static.addBands(temp);
      }
      
    }); // end of class [k]

  }); // end of year [j]
  
  // retrieve resolution propertie
  if (biome_name == 'amazonia') {
    var res = 250;
  } else {
     res = 30;
  }
  
  // insert properties into image
  image_static = image_static.set({biome: ee.String(biome_name)})
                             //.set({version: version})
                             .set({resolution: res});
  
  // plot results principal
  print (biome_name, image_static);
  
  Map.addLayer(image_static.select(['c_litter_1985']), {min: 0, max: 168, palette: palt}, biome_name + ' rect 1985');
  
  
  // export results as GEE asset (Condition with AMZ)
  // when biome equal to amazonia, export with 250 x 250 m//pixel
  if (biome_name == 'amazonia') {
    Export.image.toAsset({
      "image": image_static,
      "description": biome_name + '_rect_c_litter'+ '_250',
      "assetId": dir_output + '/' + biome_name,
      "scale": 250, // Amazon: scale 250m
      "pyramidingPolicy": {
          '.default': 'mode'
      },
      "maxPixels": 1e13,
      "region": image_static.geometry()
  });  
  
  // when biome is different of amazonia, export with 30 x 30 m pixel
  } else {
    Export.image.toAsset({
      "image": image_static,
      "description": biome_name + '_rect_c_litter'+ '_250',
      "assetId": dir_output + '/' + biome_name,
      "scale": 30, // other biomes: 30m
      "pyramidingPolicy": {
          '.default': 'mode'
      },
      "maxPixels": 1e13,
      "region": image_static.geometry()
  });  
  }

}); // end of biome [i]
