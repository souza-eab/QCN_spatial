
// Asset QCN - FITO - LULC
var fc_amz = ee.FeatureCollection('projects/mapbiomas-workspace/SEEG/2023/QCN/0_1_AOI_AMAZON');
var fc_biomes = ee.FeatureCollection('projects/mapbiomas-workspace/SEEG/2023/QCN/0_1_AOI_ALL_Biomes_exc');

// Obter os nomes das colunas de cada FeatureCollection
var columnNames_amz = fc_amz.first().propertyNames();
var columnNames_biomes = fc_biomes.first().propertyNames();

// Imprimir os nomes das colunas de cada FeatureCollection
print('Nomes das colunas de fc_amz:', columnNames_amz);
print('Nomes das colunas de fc_biomes:', columnNames_biomes);

// Output - Colunas dos assets
// [fc_amz = 'Feature Index',	'C_prtrg', 'C_prtvz', 'Type_Ft', 'system:index']
// [fc_biomes = 'Feature Index',	'c_pretorig', 'c_pretvizi', 'system:index','tipo']

// Renomear as colunas de 'fc_biomes' iguual a 'fc_amz' para harmonizar o nome das colunas de ambos os dados
// Renomear as colunas da FeatureCollection 'fc_biomes' para corresponder às da FeatureCollection 'fc_amz'
var renamedBiomes = fc_biomes.select(
  ['C_prtrg', 'C_prtvz', 'system:index', 'Type_Ft'], // Colunas originais
  ['c_pretorig', 'c_pretvizi', 'system:index', 'tipo'] // Novos nomes
);

// Juntar as duas FeatureCollections de maneira correta
var joinedCollection = fc_amz.merge(renamedBiomes);

// Adicionar a camada no mapa usando a propriedade 'c_pretvizi'
var visParams = {
  palette: ['blue', 'green', 'red'] // Defina sua paleta de cores aqui
};



Map.addLayer(joinedCollection, visParams, 'c_pretvizi Layer');


var columnNames_biomes_11 = joinedCollection.first().propertyNames();
// Imprimir os nomes das colunas de cada FeatureCollection
print('Nomes das colunas de fc_full:', columnNames_biomes_11);


// Verificar a presença de valores na propriedade 'C_prtvz'
var classF = joinedCollection.aggregate_histogram('c_pretvizi');
print("Valores na propriedade 'C_prtvz':", classF);


// Exportar a FeatureCollection resultante
Export.table.toAsset({
  collection: joinedCollection,
  description: '0_1_AOI_QCN_FITO-LULC',
  assetId: 'projects/mapbiomas-workspace/SEEG/2023/QCN/0_1_AOI_QCN_FITO-LULC_v0'
});
