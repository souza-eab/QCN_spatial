var fC = ee.FeatureCollection("projects/mapbiomas-workspace/SEEG/2023/QCN/0_2_AOI_BR_QCN_FITO-LULC_v1");

//var totalFeatures = fC.size();
//print('Número total de features na remappedCollection:', totalFeatures);

// Obter uma lista de classes únicas
var classes = fC.aggregate_array('C_prtvz_remap').distinct();
print("Classes:", classes); // Verificar os valores únicos

var classF = fC.aggregate_histogram('C_prtvz_remap');
print("Valores na propriedade 'C_prtvz_remap:", classF);


// Filtrar os recursos com valor 'Aa' na propriedade 'C_prtvz_remap'
var filteredFCAa = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Aa')); 
var filteredFCAb = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Ab'));
var filteredFCAm = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Am'));
var filteredFCAr = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Ar'));
var filteredFCAs = fC.filter(ee.Filter.eq('C_prtvz_remap', 'As'));
var filteredFCCa = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Ca'));
var filteredFCCb = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Cb'));
var filteredFCD = fC.filter(ee.Filter.eq('C_prtvz_remap', 'D'));
var filteredFCDa = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Da'));
var filteredFCDb = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Db'));
var filteredFCDl = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Dl'));
var filteredFCDm = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Dm'));
var filteredFCDn = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Dn'));
var filteredFCDs = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Ds'));
var filteredFCE = fC.filter(ee.Filter.eq('C_prtvz_remap', 'E'));
var filteredFCEm = fC.filter(ee.Filter.eq('C_prtvz_remap', 'EM'));
var filteredFCEn = fC.filter(ee.Filter.eq('C_prtvz_remap', 'EN'));
var filteredFCEp = fC.filter(ee.Filter.eq('C_prtvz_remap', 'EP'));
var filteredFCEa = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Ea'));
var filteredFCEg = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Eg'));
var filteredFCEp = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Ep'));
var filteredFCF = fC.filter(ee.Filter.eq('C_prtvz_remap', 'F'));
var filteredFCFa = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Fa'));
var filteredFCFb = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Fb'));
var filteredFCFm = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Fm'));
var filteredFCFs = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Fs'));
var filteredFCL = fC.filter(ee.Filter.eq('C_prtvz_remap', 'L'));
var filteredFCLo = fC.filter(ee.Filter.eq('C_prtvz_remap', 'LO'));
var filteredFCLa = fC.filter(ee.Filter.eq('C_prtvz_remap', 'La'));
var filteredFCLb = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Lb'));
var filteredFCLd = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Ld'));
var filteredFCLg = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Lg'));
var filteredFCM  = fC.filter(ee.Filter.eq('C_prtvz_remap', 'M'));
var filteredFCMa = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Ma'));
var filteredFCMl = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Ml'));
var filteredFCMm = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Mm'));
var filteredFCMs = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Ms'));
var filteredFCNm = fC.filter(ee.Filter.eq('C_prtvz_remap', 'NM'));
var filteredFCNp = fC.filter(ee.Filter.eq('C_prtvz_remap', 'NP'));
var filteredFCOm = fC.filter(ee.Filter.eq('C_prtvz_remap', 'OM'));
var filteredFCOn = fC.filter(ee.Filter.eq('C_prtvz_remap', 'ON'));
var filteredFCOp = fC.filter(ee.Filter.eq('C_prtvz_remap', 'OP'));
var filteredFCP  = fC.filter(ee.Filter.eq('C_prtvz_remap', 'P'));
var filteredFCPa = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Pa'));
var filteredFCPf = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Pf'));
var filteredFCPm = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Pm'));
var filteredFCRl = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Rl'));
var filteredFCRm = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Rm'));
var filteredFCS  = fC.filter(ee.Filter.eq('C_prtvz_remap', 'S'));
var filteredFCSm = fC.filter(ee.Filter.eq('C_prtvz_remap', 'SM'));
var filteredFCSn = fC.filter(ee.Filter.eq('C_prtvz_remap', 'SN'));
var filteredFCSo = fC.filter(ee.Filter.eq('C_prtvz_remap', 'SO'));
var filteredFCSp = fC.filter(ee.Filter.eq('C_prtvz_remap', 'SP'));
var filteredFCSt = fC.filter(ee.Filter.eq('C_prtvz_remap', 'ST'));
var filteredFCStn= fC.filter(ee.Filter.eq('C_prtvz_remap', 'STN'));
var filteredFCSa = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Sa'));
var filteredFCSd = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Sd'));
var filteredFCSg = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Sg'));
var filteredFCSp = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Sp'));
var filteredFCT  = fC.filter(ee.Filter.eq('C_prtvz_remap', 'T'));
var filteredFCTn = fC.filter(ee.Filter.eq('C_prtvz_remap', 'TN'));
var filteredFCTa = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Ta'));
var filteredFCTd = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Td'));
var filteredFCTg = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Tg'));
var filteredFCTp = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Tp'));
var filteredFCNULL = fC.filter(ee.Filter.eq('C_prtvz_remap', '')); //Null 

// Adicionar os recursos filtrados ao mapa
Map.addLayer(filteredFCSa, {}, 'Recursos com valor "S"');

/*
// Obter as categorias únicas da propriedade 'c_pretvizi'
var classes = fC.aggregate_array('c_pretvizi').distinct();
//print(classes)
// Atribuir IDs numéricos para cada categoria
var classIDs = ee.List.sequence(0, classes.size());
//print(classIDs)

// Criar uma função para atribuir IDs numéricos para cada categoria
var assignID = function(feature) {
  var id = ee.Algorithms.If(
    classes.contains(feature.get('c_pretvizi')),
    classIDs.get(classes.indexOf(feature.get('c_pretvizi'))),
    999 // ID padrão para categorias não encontradas
  );
  return feature.set('class_id', id);
};

// Mapear a função para cada feature na FeatureCollection
var featuresWithIDs = fC.map(assignID);

// Rasterizar a FeatureCollection usando os IDs atribuídos
var raster = featuresWithIDs.reduceToImage({
  properties: ['class_id'],
  reducer: ee.Reducer.first()
});

// Visualizar o raster
//Map.addLayer(raster.randomVisualizer(), {}, 'Rasterized FC');


// Exportar o raster para o Google Earth Engine
Export.image.toAsset({
  image: raster,
  description: 'rasterized_fc',
  assetId: 'projects/mapbiomas-workspace/SEEG/2023/QCN/0_3_AOI_BR_QCN_FITO_LULC_rasterized_v2',
  scale: 30, // Ajuste a escala conforme necessário
  region: fC.geometry().bounds(), // Defina a região de interesse
  maxPixels: 1e13 // Ajuste conforme necessário
});
*/
