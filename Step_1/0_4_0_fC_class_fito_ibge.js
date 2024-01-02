/*
  // OBJ: Disponibilizar Fitofisionomias da QCN-IBGE (LULC no .Earth Engine)
  
  Version
  0_1 - Juntar e exportar as fC
  0_1 - Subir asset com todos os biomas via py
  0_0 - Subir asset com as fC da Amazon

*/

// Assets QCN - FITO - LULC
var fc_amz = ee.FeatureCollection('projects/mapbiomas-workspace/SEEG/2023/QCN/0_1_AOI_AMAZON');
var fc_biomes = ee.FeatureCollection('projects/mapbiomas-workspace/SEEG/2023/QCN/0_1_AOI_ALL_Biomes_exc'); //All_biomes - excpt AMZ

// Verificar os nomes das colunas de cada FeatureCollection
var columnNames_amz = fc_amz.first().propertyNames();
print('Nomes das colunas de fc_amz:', columnNames_amz);
var columnNames_biomes = fc_biomes.first().propertyNames();
print('Nomes das colunas de fc_biomes:', columnNames_biomes);

// Renomear as colunas da FeatureCollection 'fc_biomes' para corresponder às da FeatureCollection 'fc_amz'
var renamedBiomes = fc_biomes.select(
  ['C_prtrg', 'C_prtvz', 'system:index', 'Type_Ft'], // 
  ['c_pretorig', 'c_pretvizi', 'system:index', 'tipo'] // Novos nomes
);

// Merge das duas FeatureCollections 
var joinedCollection = fc_amz.merge(renamedBiomes);

//var joinedCollection = ee.FeatureCollection([fc_amz, renamedBiomes]).flatten();

var columnNames_biomes_11 = joinedCollection.first().propertyNames();
print('Nomes das colunas de fc_full:', columnNames_biomes_11);


// Verificar a presença de valores na propriedade 'C_prtvz'
var classF = joinedCollection.aggregate_histogram('c_pretvizi');
//print("Valores na propriedade 'C_prtvz':", classF);

// Map.addLayer
//var visParams = {
//  palette: ['blue', 'green', 'red'] // Defina sua paleta de cores aqui
//};
//Map.addLayer(joinedCollection, visParams, 'c_pretvizi Layer');


// Definir a paleta de cores Viridis com 91 cores
var palette = [
  '#440154', '#440558', '#450a5c', '#450e60', '#461463', '#461867', '#471c6b', '#47206f', '#482573', '#482977',
  '#492d7b', '#49317f', '#4a3583', '#4a3987', '#4b3d8b', '#4c418e', '#4c4592', '#4d4996', '#4e4d9a', '#4e519e',
  '#4f55a2', '#505aa6', '#515ea9', '#5163ad', '#5267b1', '#536cb5', '#5460b6', '#5566b8', '#566bb9', '#5760ba',
  '#5865bc', '#596bbc', '#5a70bd', '#5b75be', '#5c6bbe', '#5d70bf', '#5e75bf', '#5f7abf', '#607ebf', '#6183bf',
  '#6288bf', '#638dbf', '#658fbf', '#6693be', '#6798be', '#689cbe', '#6a9fbe', '#6ba3bd', '#6ca7bd', '#6eabbc',
  '#6fafbb', '#71b3ba', '#72b8b9', '#74bcb8', '#76c0b7', '#78c5b6', '#7ac9b5', '#7bccb3', '#7dc0b2', '#7fbeb0',
  '#81bdae', '#84bfaa', '#86bfa6', '#88c0a2', '#8ac19e', '#8cc199', '#8ec295', '#90c390', '#92c48c', '#95c588',
  '#97c683', '#99c77f', '#9cc87a', '#9ec976', '#a1ca71', '#a3cb6d', '#a6cc68', '#a8cc64', '#abcc5f', '#adcd5b',
  '#b0cd56', '#b2cd52', '#b5cc4d', '#b7cc49', '#bacc44', '#bdcb3f', '#bfcb3b', '#c2ca36', '#c4c931', '#c7c92c',
  '#c9c827', '#ccc722', '#cec71d', '#cfc61a', '#d0c41a', '#d1c219', '#d3c118', '#d4c017', '#d5bf16', '#d7bd15',
  '#d8bc14', '#d9ba13', '#dab812', '#dbb611', '#dcb310', '#ddb10f', '#dea00f', '#df9e0f', '#e09c0e', '#e19b0e',
  '#e2990e', '#e3970e', '#e4950e', '#e5940e', '#e6920e', '#e7900e', '#e88e0e', '#e98d0e', '#ea8b0e', '#eb890e',
  '#ec870e', '#ed860e', '#ee840e', '#ef820e', '#f0800e', '#f17f0e', '#f27d0e', '#f37b0e', '#f4790e', '#f5780e',
  '#f6760e', '#f7740e', '#f8720e', '#f9710e', '#fa6f0e', '#fb6d0e', '#fc6b0e', '#fd6a0e', '#fe680e', '#ff660e'
];

var classes = joinedCollection.aggregate_array('c_pretvizi').distinct();
//print("Classes:", classes); // Verificar os valores únicos

// Criar uma função para atribuir cores a cada classe
var assignColor = function(feature) {
  var index = ee.List(classes).indexOf(feature.get('c_pretvizi'));
  var color = ee.Algorithms.If(index.gte(0), ee.List(palette).get(index.mod(ee.List(palette).length())), '440154');
  return feature.set('style', ee.Dictionary.fromLists(['color'], [color]));
};

// Mapear a função para cada feature no FeatureCollection
var coloredCollection = joinedCollection.map(assignColor);

// Adicionar as features coloridas ao mapa
Map.addLayer(coloredCollection.style({styleProperty: 'style'}), {}, '91 - Classes Coloridas');

//Map.addLayer(coloredCollection.select('c_pretivizi'), {}, 'Classes Coloridas');

/*
// Exportar a FeatureCollection resultante
Export.table.toAsset({
  collection: joinedCollection,
  description: '0_1_AOI_QCN_FITO-LULC',
  assetId: 'projects/mapbiomas-workspace/SEEG/2023/QCN/0_1_AOI_QCN_FITO-LULC_v0'
});
*/

// Part II

// Agrupar classes de contato para grandes classes; 

// Criar um dicionário para remapear valores
var remapDict = ee.Dictionary({
  'ONm': 'ON',
  'ONs': 'ON',
  'ONts': 'ON',
  'SMl': 'SM',
  'SMm': 'SM',
  'SNb': 'SN',
  'SNm':'SN',
  'SNs':'SN',
  'SNtm': 'SN',
  'SNts': 'SN',
  'SOs': 'SO',
  'SOts': 'SO',
  'STb' : 'ST',
  'STNm' : 'STN',
  'STNs' : 'STN',
  'STNtm' : 'STN',
  'STNts' : 'STN',
  'STs' : 'ST',
  'STtm' : 'ST',
  'STts': 'ST',
  'TNm': 'TN',
  'TNs': 'TN',
  'TNtm': 'TN',
  'TNts': 'TN'});

// Função para aplicar remapeamento aos valores de uma propriedade
var remapProperty = function(feature) {
  // Obter o valor da propriedade 'C_prtvz'
  var originalValue = ee.Algorithms.String(feature.get('c_pretvizi'));

  // Verificar se o valor existe no dicionário de remapeamento e remapear se necessário
  var remappedValue = ee.String(remapDict.get(originalValue, originalValue));

  // Retornar a feature com a nova propriedade remapeada
  return feature.set('C_prtvz_remap', remappedValue);
};

// Filtrar a coleção para remover features com valores nulos ou vazios em 'c_pretivizi'
joinedCollection = joinedCollection.filter(ee.Filter.notNull(['c_pretvizi']));

// Mapear a função sobre a coleção para adicionar a nova propriedade remapeada
var remappedCollection = joinedCollection.map(remapProperty);

// Verificar a presença dos valores remapeados na nova propriedade
var remappedValues = remappedCollection.aggregate_histogram('C_prtvz_remap');
//print("Valores remapeados na propriedade 'C_prtvz_remap':", remappedValues);

// Adicionar a nova coleção remapeada ao mapa
Map.addLayer(remappedCollection, {}, 'Remapped Collection');

// Exportar a FeatureCollection resultante com a nova propriedade remapeada
Export.table.toAsset({
  collection: remappedCollection,
  description: '0_2_AOI_BR_QCN_FITO-LULC_v1',
  assetId: 'projects/mapbiomas-workspace/SEEG/2023/QCN/0_2_AOI_BR_QCN_FITO-LULC_v1'
});



// Exibir alguns valores antes e depois do remapeamento para ver as diferenças
var sampleFeatures = joinedCollection.limit(10); // Pegar 10 amostras

// Mostrar os valores originais e remapeados para a propriedade 'c_pretivizi'
sampleFeatures = sampleFeatures.map(function(feature) {
  var originalValue = feature.get('c_pretivizi');
  var remappedValue = feature.get('C_prtvz_remap');
  return feature.set('Original_Value', originalValue).set('Remapped_Value', remappedValue);
});

// Visualizar as propriedades para verificar se o remapeamento está ocorrendo conforme esperado
print(sampleFeatures);
