var fC = ee.FeatureCollection("projects/mapbiomas-workspace/SEEG/2023/QCN/0_2_AOI_BR_QCN_FITO-LULC_v1");

//var totalFeatures = fC.size();
//print('Número total de features na remappedCollection:', totalFeatures);

// Obter uma lista de classes únicas
var classes = fC.aggregate_array('C_prtvz_remap').distinct();
//print("Classes:", classes); // Verificar os valores únicos

var classF = fC.aggregate_histogram('C_prtvz_remap');
//print("Valores na propriedade 'C_prtvz_remap:", classF);


// Filtrar os recursos com valor 'Aa' na propriedade 'C_prtvz_remap'
var filteredFC_Aa = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Aa')); 
var filteredFC_Ab = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Ab'));
var filteredFC_Am = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Am'));
var filteredFC_Ar = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Ar'));
var filteredFC_As = fC.filter(ee.Filter.eq('C_prtvz_remap', 'As'));
var filteredFC_Ca = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Ca'));
var filteredFC_Cb = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Cb'));
var filteredFC_D = fC.filter(ee.Filter.eq('C_prtvz_remap', 'D'));
var filteredFC_Da = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Da'));
var filteredFC_Db = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Db'));
var filteredFC_Dl = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Dl'));
var filteredFC_Dm = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Dm'));
var filteredFC_Dn = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Dn'));
var filteredFC_Ds = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Ds'));
var filteredFC_E = fC.filter(ee.Filter.eq('C_prtvz_remap', 'E'));
var filteredFC_Em = fC.filter(ee.Filter.eq('C_prtvz_remap', 'EM'));
var filteredFC_En = fC.filter(ee.Filter.eq('C_prtvz_remap', 'EN'));
var filteredFC_Ep = fC.filter(ee.Filter.eq('C_prtvz_remap', 'EP'));
var filteredFC_Ea = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Ea'));
var filteredFC_Eg = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Eg'));
var filteredFC_Ep = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Ep'));
var filteredFC_F = fC.filter(ee.Filter.eq('C_prtvz_remap', 'F'));
var filteredFC_Fa = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Fa'));
var filteredFC_Fb = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Fb'));
var filteredFC_Fm = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Fm'));
var filteredFC_Fs = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Fs'));
var filteredFC_L = fC.filter(ee.Filter.eq('C_prtvz_remap', 'L'));
var filteredFC_Lo = fC.filter(ee.Filter.eq('C_prtvz_remap', 'LO'));
var filteredFC_La = fC.filter(ee.Filter.eq('C_prtvz_remap', 'La'));
var filteredFC_Lb = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Lb'));
var filteredFC_Ld = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Ld'));
var filteredFC_Lg = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Lg'));
var filteredFC_M  = fC.filter(ee.Filter.eq('C_prtvz_remap', 'M'));
var filteredFC_Ma = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Ma'));
var filteredFC_Ml = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Ml'));
var filteredFC_Mm = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Mm'));
var filteredFC_Ms = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Ms'));
var filteredFC_Nm = fC.filter(ee.Filter.eq('C_prtvz_remap', 'NM'));
var filteredFC_Np = fC.filter(ee.Filter.eq('C_prtvz_remap', 'NP'));
var filteredFC_Om = fC.filter(ee.Filter.eq('C_prtvz_remap', 'OM'));
var filteredFC_On = fC.filter(ee.Filter.eq('C_prtvz_remap', 'ON'));
var filteredFC_Op = fC.filter(ee.Filter.eq('C_prtvz_remap', 'OP'));
var filteredFC_P  = fC.filter(ee.Filter.eq('C_prtvz_remap', 'P'));
var filteredFC_Pa = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Pa'));
var filteredFC_Pf = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Pf'));
var filteredFC_Pm = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Pm'));
var filteredFC_Rl = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Rl'));
var filteredFC_Rm = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Rm'));
var filteredFC_S  = fC.filter(ee.Filter.eq('C_prtvz_remap', 'S'));
var filteredFC_Sm = fC.filter(ee.Filter.eq('C_prtvz_remap', 'SM'));
var filteredFC_Sn = fC.filter(ee.Filter.eq('C_prtvz_remap', 'SN'));
var filteredFC_So = fC.filter(ee.Filter.eq('C_prtvz_remap', 'SO'));
var filteredFC_Sp = fC.filter(ee.Filter.eq('C_prtvz_remap', 'SP'));
var filteredFC_St = fC.filter(ee.Filter.eq('C_prtvz_remap', 'ST'));
var filteredFC_Stn= fC.filter(ee.Filter.eq('C_prtvz_remap', 'STN'));
var filteredFC_Sa = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Sa'));
var filteredFC_Sd = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Sd'));
var filteredFC_Sg = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Sg'));
var filteredFC_Sp = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Sp'));
var filteredFC_T  = fC.filter(ee.Filter.eq('C_prtvz_remap', 'T'));
var filteredFC_Tn = fC.filter(ee.Filter.eq('C_prtvz_remap', 'TN'));
var filteredFC_Ta = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Ta'));
var filteredFC_Td = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Td'));
var filteredFC_Tg = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Tg'));
var filteredFC_Tp = fC.filter(ee.Filter.eq('C_prtvz_remap', 'Tp'));
var filteredFC_NULL = fC.filter(ee.Filter.eq('C_prtvz_remap', '')); //Null 

// Adicionar os recursos filtrados ao mapa
//Map.addLayer(filteredFC_Ld, {}, 'Recursos com valor "Ld"');



/// Em desenvolviemento


var fC = ee.FeatureCollection("projects/mapbiomas-workspace/SEEG/2023/QCN/0_2_AOI_BR_QCN_FITO-LULC_v1");

// Lista de classes presentes na propriedade 'C_prtvz_remap'
var classes = [
  'Aa', 'Ab', 'Am', 'Ar', 'As', 'Ca', 'Cb', 'D', 'Da', 'Db', 'Dl', 'Dm', 'Dn', 'Ds',
  'E', 'EM', 'EN', 'EP', 'Ea', 'Eg', 'Ep', 'F', 'Fa', 'Fb', 'Fm', 'Fs', 'L', 'LO', 'La',
  'Lb', 'Ld', 'Lg', 'M', 'Ma', 'Ml', 'Mm', 'Ms', 'NM', 'NP', 'OM', 'ON', 'OP', 'P',
  'Pa', 'Pf', 'Pm', 'Rl', 'Rm', 'S', 'SM', 'SN', 'SO', 'SP', 'ST', 'STN', 'Sa', 'Sd',
  'Sg', 'Sp', 'T', 'TN', 'Ta', 'Td', 'Tg', 'Tp'
];

// Iterar sobre as classes e adicionar cada camada filtrada ao mapa
for (var i = 0; i < classes.length; i++) {
  var filteredFC = fC.filter(ee.Filter.eq('C_prtvz_remap', classes[i]));
  Map.addLayer(filteredFC, {}, 'Classes fito_QCN "' + classes[i] + '"');
}

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
