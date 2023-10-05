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
var dir_output = 'projects/mapbiomas-workspace/SEEG/2023/QCN/3_Asset_v0-1_rect_AGB' // 30 m
//var dir_output = 'projects/mapbiomas-workspace/SEEG/2023/QCN/3_Asset_v0-2_rect_AGB' // 250m (EBA-Amz) | 30m (Others biomes)


var version = '0-1';
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
var list_mapb_years = [1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997,
                       1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
                       2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022
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

// define mapbiomas colelction 7.0 reclassification matrix
// var raw_mapbiomas  = [3, 4, 5, 6,  9, 11, 12, 13, 15, 20, 21, 23, 24, 25, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49, 50, 62];   //*BZ
// var reclass_vector = [3, 4, 5, 6,  0, 11, 12,  13,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 0,  0,  0,  0,  0,  0, 49, 50, 0];   //*B
var raw_mapbiomas  = [3, 4, 5, 6,  9, 11, 12, 13, 15, 20, 21, 23, 24, 25, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49, 50, 62];   //*Edriano
var reclass_vector = [3, 4, 5, 6,  0, 11, 12, 13,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 49, 50,  0];   //*Edriano

// import QCN data
var qcn = ee.ImageCollection('projects/mapbiomas-workspace/SEEG/2023/QCN/1_Asset_v0-1')
  .mosaic(); 

//var qcn = ee.ImageCollection('projects/mapbiomas-workspace/SEEG/2023/QCN/1_Asset_v0-2')
  //          .mosaic(); 
            
// import biomes raster
var biomes = ee.Image('projects/mapbiomas-workspace/AUXILIAR/biomas-2019-raster'); //* ok

// import states raster
var states = ee.Image('projects/mapbiomas-workspace/AUXILIAR/estados-2016-raster'); //* ok

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
var qcn_c_agb = qcn.select(['c_agb']);
//var qcn_c_bgb = qcn.select(['c_bgb']);
//var qcn_c_dw = qcn.select(['c_dw']);
//var qcn_c_dw = qcn.select(['c_dw']);
//var qcn_c_litter = qcn.select(['c_litter']);

// plot inspects
//Map.addLayer(qcn_class, vis, 'QCN_Class_MB_C8');
//Map.addLayer(qcn_c_agb, {min: 0, max: 168, palette: palt}, 'QCN_c_agb');

// for each biome
list_biomes.forEach(function(biome_i) {
  // define raw 'c_c_agb' for the biome [i]
  var biome_tot = qcn_c_agb.updateMask(biomes.eq(biome_i));
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
      
      // perform the correction of 'c_c_agb' for the biome [i], year [j] and class [k]
      // when biome equals amazonia
      
      // AGB
      if (biome_i == 1) {
        biome_name = 'amazonia';                                              //OK 
        var tot_rect = biome_tot.where(discordance_ijk.eq(3), 20.72);  
            tot_rect = tot_rect.where(discordance_ijk.eq(4),  134.31);  
            tot_rect = tot_rect.where(discordance_ijk.eq(5),  58.64);   
            tot_rect = tot_rect.where(discordance_ijk.eq(6),  20.72);         // equal class 3            
            tot_rect = tot_rect.where(discordance_ijk.eq(11), 22.99);       
            tot_rect = tot_rect.where(discordance_ijk.eq(12), 181.66);  
      } // Amazonia conferida
      
      // when biome equals to mata atlantica
      if (biome_i == 2) {
        biome_name = 'mata_atlantica';                                        //OK   
        var tot_rect = biome_tot.where(discordance_ijk.eq(3), 26.05);   
            tot_rect = tot_rect.where(discordance_ijk.eq(4),  33.35);     
            tot_rect = tot_rect.where(discordance_ijk.eq(5),  201.35);        
            tot_rect = tot_rect.where(discordance_ijk.eq(6),  26.05);         // equal class 3                                                
            tot_rect = tot_rect.where(discordance_ijk.eq(11), 57.33);       
            tot_rect = tot_rect.where(discordance_ijk.eq(12), 3.08);  
            tot_rect = tot_rect.where(discordance_ijk.eq(13), 201.35);       // equal class 5
            tot_rect = tot_rect.where(discordance_ijk.eq(49), 117.22);  
            tot_rect = tot_rect.where(discordance_ijk.eq(50), 117.22);       // equal class 49
      } // MA conferida
      
      // when biome equals to pantanal
      if (biome_i == 3) {
        biome_name = 'pantanal';   
        var tot_rect = biome_tot.where(discordance_ijk.eq(3), 32.45);  
            tot_rect = tot_rect.where(discordance_ijk.eq(4),  11.25);       
            tot_rect = tot_rect.where(discordance_ijk.eq(6),  32.45);         // equal class 3                                                
            tot_rect = tot_rect.where(discordance_ijk.eq(11), 0.48);
            tot_rect = tot_rect.where(discordance_ijk.eq(12), 0.42);    
            tot_rect = tot_rect.where(discordance_ijk.eq(13), 0.48); //*BZ    // equal class 11
      } // 11 e 12 inversão
      
      // when biome equals to cerrado
      if (biome_i == 4) {
        biome_name = 'cerrado';   
        // when discordance equal to forest formation           
        var tot_rect = biome_tot.where(states.eq(11).and(discordance_ijk.eq(3)), 51.05 );           // RO // Falta dado e colocamos a média geral da UFs //*BZ
            tot_rect = tot_rect.where(states.eq(17).and(discordance_ijk.eq(3)),  45.41707464);      // TO 
            tot_rect = tot_rect.where(states.eq(21).and(discordance_ijk.eq(3)),  41.67536965);      // MA 
            tot_rect = tot_rect.where(states.eq(22).and(discordance_ijk.eq(3)),  40.48964273);      // PI 
            tot_rect = tot_rect.where(states.eq(29).and(discordance_ijk.eq(3)),  41.02542625);      // BA 
            tot_rect = tot_rect.where(states.eq(31).and(discordance_ijk.eq(3)),  43.30993279);      // MG 
            tot_rect = tot_rect.where(states.eq(35).and(discordance_ijk.eq(3)),  54.33923594);      // SP 
            tot_rect = tot_rect.where(states.eq(41).and(discordance_ijk.eq(3)),  50.12589671);      // PR 
            tot_rect = tot_rect.where(states.eq(50).and(discordance_ijk.eq(3)),  67.34418465);      // MS 
            tot_rect = tot_rect.where(states.eq(51).and(discordance_ijk.eq(3)),  65.8869862);       // MT 
            tot_rect = tot_rect.where(states.eq(52).and(discordance_ijk.eq(3)),  43.30821719);      // GO 
            tot_rect = tot_rect.where(states.eq(53).and(discordance_ijk.eq(3)),  47.8176185);       // DF 
            
        // when discordance equal to other types of NV   // Diff Version                                
            tot_rect = tot_rect.where(discordance_ijk.eq(4),    1.25);                              
            tot_rect = tot_rect.where(discordance_ijk.eq(5),  430.50);    //*BZ                           
            tot_rect = tot_rect.where(discordance_ijk.eq(11),  73.26);                              
            tot_rect = tot_rect.where(discordance_ijk.eq(12),   2.20);                               
            tot_rect = tot_rect.where(discordance_ijk.eq(49),    782); //*BZ                              
            tot_rect = tot_rect.where(discordance_ijk.eq(50),    782); //*BZ
      }
      
      // when biome equal to caatinga
      if (biome_i == 5) {
        biome_name = 'caatinga';    
        var tot_rect = biome_tot.where(discordance_ijk.eq(3), 57.89);  
            tot_rect = tot_rect.where(discordance_ijk.eq(4),  0.52);  
            tot_rect = tot_rect.where(discordance_ijk.eq(5),  455.85);  
            tot_rect = tot_rect.where(discordance_ijk.eq(6),  57.89);        //equal class 3                                    
           // tot_rect = tot_rect.where(discordance_ijk.eq(11), 36.21); //?
            tot_rect = tot_rect.where(discordance_ijk.eq(12), 10.68);  
            //tot_rect = tot_rect.where(discordance_ijk.eq(13), 83.06);//?
            tot_rect = tot_rect.where(discordance_ijk.eq(49), 184.75); 
            tot_rect = tot_rect.where(discordance_ijk.eq(50), 184.75); //*BZ
      } // Class 11 e 13  not fitofisionomias.xls
      
      // when biome equal to pampa
      if (biome_i == 6) {
        biome_name = 'pampa';
        var tot_rect = biome_tot.where(discordance_ijk.eq(3), 77.73);   
            // tot_rect = tot_rect.where(discordance_ijk.eq(5),  12.77);  
            tot_rect = tot_rect.where(discordance_ijk.eq(6), 77.73);                                                   
            tot_rect = tot_rect.where(discordance_ijk.eq(11), 0.26);  
            tot_rect = tot_rect.where(discordance_ijk.eq(12), 2.55);  
            tot_rect = tot_rect.where(discordance_ijk.eq(49), 1.29); 
            tot_rect = tot_rect.where(discordance_ijk.eq(50), 1.29); //*BZ
      } // 49 e 50 include Babi
      
      
      // BGB - Em desenvolvimento
      //if (biome_i == 1) {
      //  biome_name = 'amazonia';                                              //OK 
      //  var tot_rect = biome_tot.where(discordance_ijk.eq(3), 10.24);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(4),  271.42);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(5),  21.82);   
      //      tot_rect = tot_rect.where(discordance_ijk.eq(6),  10.24);         // equal class 3            
      //      tot_rect = tot_rect.where(discordance_ijk.eq(11), 8.50);       
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12), 243.95);  
      //} // Amazonia conferida
      //
      //// when biome equals to mata atlantica
      //if (biome_i == 2) {
      //  biome_name = 'mata_atlantica';                                        //OK   
      //  var tot_rect = biome_tot.where(discordance_ijk.eq(3), 6.08);   
      //      tot_rect = tot_rect.where(discordance_ijk.eq(4),  18.64);     
      //      tot_rect = tot_rect.where(discordance_ijk.eq(5),  47.32);        
      //      tot_rect = tot_rect.where(discordance_ijk.eq(6),  6.08);         // equal class 3                                                
      //      tot_rect = tot_rect.where(discordance_ijk.eq(11), 13.47);       
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12), 7.23);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(13), 47.32);       // equal class 5
      //      tot_rect = tot_rect.where(discordance_ijk.eq(49), 27.54);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(50), 27.54);       // equal class 49
      //} // MA conferida
      //
      //// when biome equals to pantanal
      //if (biome_i == 3) {
      //  biome_name = 'pantanal';   
      //  var tot_rect = biome_tot.where(discordance_ijk.eq(3), 32.45);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(4),  11.25);       
      //      tot_rect = tot_rect.where(discordance_ijk.eq(6),  32.45);         // equal class 3                                                
      //      tot_rect = tot_rect.where(discordance_ijk.eq(11), 0.48);
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12), 0.42);    
      //      tot_rect = tot_rect.where(discordance_ijk.eq(13), 0.48); //*BZ    // equal class 11
      //} // 11 e 12 inversão
      //
      //// when biome equals to cerrado
      //if (biome_i == 4) {
      //  biome_name = 'cerrado';   
      //  // when discordance equal to forest formation           
      //  var tot_rect = biome_tot.where(states.eq(11).and(discordance_ijk.eq(3)), 51.05 );           // RO // Falta dado e colocamos a média geral da UFs //*BZ
      //      tot_rect = tot_rect.where(states.eq(17).and(discordance_ijk.eq(3)),  45.41707464);      // TO 
      //      tot_rect = tot_rect.where(states.eq(21).and(discordance_ijk.eq(3)),  41.67536965);      // MA 
      //      tot_rect = tot_rect.where(states.eq(22).and(discordance_ijk.eq(3)),  40.48964273);      // PI 
      //      tot_rect = tot_rect.where(states.eq(29).and(discordance_ijk.eq(3)),  41.02542625);      // BA 
      //      tot_rect = tot_rect.where(states.eq(31).and(discordance_ijk.eq(3)),  43.30993279);      // MG 
      //      tot_rect = tot_rect.where(states.eq(35).and(discordance_ijk.eq(3)),  54.33923594);      // SP 
      //      tot_rect = tot_rect.where(states.eq(41).and(discordance_ijk.eq(3)),  50.12589671);      // PR 
      //      tot_rect = tot_rect.where(states.eq(50).and(discordance_ijk.eq(3)),  67.34418465);      // MS 
      //      tot_rect = tot_rect.where(states.eq(51).and(discordance_ijk.eq(3)),  65.8869862);       // MT 
      //      tot_rect = tot_rect.where(states.eq(52).and(discordance_ijk.eq(3)),  43.30821719);      // GO 
      //      tot_rect = tot_rect.where(states.eq(53).and(discordance_ijk.eq(3)),  47.8176185);       // DF 
      //      
      //  // when discordance equal to other types of NV   // Diff Version                                
      //      tot_rect = tot_rect.where(discordance_ijk.eq(4),    1.25);                              
      //      tot_rect = tot_rect.where(discordance_ijk.eq(5),  430.50);    //*BZ                           
      //      tot_rect = tot_rect.where(discordance_ijk.eq(11),  73.26);                              
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12),   2.20);                               
      //      tot_rect = tot_rect.where(discordance_ijk.eq(49),    782); //*BZ                              
      //      tot_rect = tot_rect.where(discordance_ijk.eq(50),    782); //*BZ
      //}
      //
      //// when biome equal to caatinga
      //if (biome_i == 5) {
      //  biome_name = 'caatinga';    
      //  var tot_rect = biome_tot.where(discordance_ijk.eq(3), 57.89);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(4),  0.52);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(5),  455.85);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(6),  57.89);        //equal class 3                                    
      //     // tot_rect = tot_rect.where(discordance_ijk.eq(11), 36.21); //?
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12), 10.68);  
      //      //tot_rect = tot_rect.where(discordance_ijk.eq(13), 83.06);//?
      //      tot_rect = tot_rect.where(discordance_ijk.eq(49), 184.75); 
      //      tot_rect = tot_rect.where(discordance_ijk.eq(50), 184.75); //*BZ
      //} // Class 11 e 13  not fitofisionomias.xls
      //
      //// when biome equal to pampa
      //if (biome_i == 6) {
      //  biome_name = 'pampa';
      //  var tot_rect = biome_tot.where(discordance_ijk.eq(3), 77.73);   
      //      // tot_rect = tot_rect.where(discordance_ijk.eq(5),  12.77);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(6), 77.73);                                                   
      //      tot_rect = tot_rect.where(discordance_ijk.eq(11), 0.26);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(12), 2.55);  
      //      tot_rect = tot_rect.where(discordance_ijk.eq(49), 1.29); 
      //      tot_rect = tot_rect.where(discordance_ijk.eq(50), 1.29); //*BZ
      //} // 49 e 50 include Babi
      
      
      

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
      temp = temp.rename('c_agb_' + year_j);

      // insert into recipe
      image_static = image_static.addBands(temp);
      }
      
    }); // end of class [k]

  }); // end of year [j]
  
  // retrieve resolution propertie
  if (biome_name == 'amazonia') {
    var res = 30;
  } else {
     res = 30;
  }
  
  // insert properties into image
  image_static = image_static.set({biome: ee.String(biome_name)})
                             .set({version: version})
                             .set({resolution: res});
                             
  // plot results
  print (biome_name, image_static);
  //Map.addLayer(image_static.select(['c_agb_1985']), {min: 0, max: 168, palette: palt}, biome_name + ' rect 1985');
  
  // export results as GEE asset (Condition with AMZ)
  // when biome equal to amazonia, export with 250 x 250 m//pixel
  if (biome_name == 'amazonia') {
    Export.image.toAsset({
      "image": image_static,
      "description": biome_name + '_rect_c_agb_v' + version,
      "assetId": dir_output + '/' + biome_name + '_rect_c_agb_v' + version,
      "scale": 30, // Amazon: scale 250m
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
      "description": biome_name + '_rect_c_agb_v' + version,
      "assetId": dir_output + '/' + biome_name + '_rect_c_agb_v' + version,
      "scale": 30, // other biomes: 30m
      "pyramidingPolicy": {
          '.default': 'mode'
      },
      "maxPixels": 1e13,
      "region": image_static.geometry()
  });  
  }

}); // end of biome [i]
