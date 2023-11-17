import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Image,
    Dimensions,

} from 'react-native'

import {useNavigation} from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'

import produtos from './Produtos'
import { imagens } from './imagens'

export default function Initial() {
    const navigation = useNavigation();

    const arquivo = [...produtos]
    const [produtosList, setProdutosList] = useState(arquivo);
    const [txtBuscarProd, setTxtBuscarProd] = useState('')
    const [viewProd, setviewProd] = useState(false)
    const [buttonColors, setButtonColors] = useState({
        Bebidas: '#78866B',
        Comida: '#78866B',
        Gaming: '#78866B',
        Esportes: '#78866B',
        Automotivo: '#78866B',
        Reset: '#78866B',
    });
    const indexNameProd = (nomeProd) => {
 
        // Use o método filter para criar uma nova lista filtrada
        if(nomeProd.trim().length > 0){
            const produtosFiltrados = produtosList.filter((p) => {
                return (p.nome.indexOf(nomeProd) !== -1);
            });
            setProdutosList(produtosFiltrados)
        } else {
            listaFiltrada()
        }        
       
    }

    const chamaIndexNameProd = () => {
        indexNameProd(txtBuscarProd)
    }

    const changeButtonColor = (category) => {

        const updatedColors = {
            Bebidas: '#78866B',
            Comida: '#78866B',
            Gaming: '#78866B',
            Esportes: '#78866B',
            Automotivo: '#78866B',
            Reset: '#78866B',
        };

        updatedColors[category] = buttonColors[category] === '#78866B' ? '#708090' : '#78866B';
        setButtonColors(updatedColors);
        setviewProd(true)

    };

    const categories = [
        { name: 'Bebidas', icon: 'wine' },
        { name: 'Comida', icon: 'restaurant' },
        { name: 'Gaming', icon: 'game-controller' },
        { name: 'Esportes', icon: 'fitness' },
        { name: 'Automotivo', icon: 'car' },
    ];

    function listaFiltrada() {
        boolFiltrar = false
        for (const key in buttonColors) {
            if (buttonColors[key] !== '#78866B') {
                if (key !== 'Reset') {
                    boolFiltrar = true
                    tipoProd = key
                }

            }
        }


        if (boolFiltrar) {
            // Use o método filter para criar uma nova lista filtrada
            const produtosFiltrados = arquivo.filter((p) => {
                return tipoProd === p.tipo;
            });
            setProdutosList(produtosFiltrados)
        } else {
            setProdutosList(arquivo)
        }
        setviewProd(false)
    }

    function obterLista() {


        return produtosList.map(p => {

            return (

                <View key={p.id}>
                    <TouchableOpacity style={styles.containerBlock} onPress={() => navigation.navigate('Produto', { idprod: p.id, nomeProd: p.nome, preco: p.preco, size: p.size, unidMedi: p.unidMedi })}>

                        <Image
                            source={imagens.imagem[p.id]}
                            style={styles.imageProd}
                            placeholder={p.nome}
                            resizeMode="contain"
                        />

                    </TouchableOpacity>
                    <View style={styles.viewDescrProd} >
                        <Text style={styles.txtNomeProd}>{p.nome}</Text>
                        <Text style={styles.txtSizeProd}>{p.size + ' ' + p.unidMedi}</Text>
                        <Text style={styles.txtPrecoProd}>{'R$ ' + p.preco.toFixed(2)}</Text>
                    </View>

                </View>

            )

        })

    }
    

    return (

        <View style={styles.container}>
            <View style={styles.containerHeader}>

                <Image
                    source={require('../../assets/usuario.png')}
                    style={styles.image}
                    placeholder='Usuario'
                />
                <View style={styles.viewBoasvinda}>
                    <Text style={{ fontSize: 16 }} >Olá</Text>
                    <Text style={styles.txtBoasvinda}>Derike</Text>
                </View>
                <View style={styles.menuList}>
                    <TouchableOpacity style={{ transform: [{ scaleX: -1 }] }} onPress={() => {navigation.navigate('Cart')}}>
                        <Ionicons name="cart-outline" size={35} />
                    </TouchableOpacity>
                </View>


            </View>

            <View style={styles.containerFilter}>
                <View style={styles.buscaProdutos}>
                    <TouchableOpacity onPress={() => indexNameProd(txtBuscarProd)}>
                        <Ionicons name="search-outline" size={30} />
                    </TouchableOpacity>
                    <TextInput
                        placeholder='Buscar produtos...'
                        style={styles.input}
                        value={txtBuscarProd}
                        onChangeText={setTxtBuscarProd}
                        onSubmitEditing = {chamaIndexNameProd}
                    />
                </View>

            </View>

            <ScrollView horizontal style={styles.categoriasProdutos} >
                <View style={styles.cateProdutosrow}>

                    {categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.categoProduFiltro,
                                { backgroundColor: buttonColors[category.name] }
                            ]}
                            onPress={() => changeButtonColor(category.name)}
                        >
                            <Ionicons name={category.icon} size={35} />
                            <Text style={styles.input}>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.resultados} >
                <View style={{ flexDirection: 'row', marginLeft: '4%', marginRight: '4%', }}>
                    <Text style={styles.TexPesq}>({obterLista().length})</Text>
                    <Text style={styles.TexPesq}>Resultados</Text>
                    <TouchableOpacity style={{ alignItems: 'flex-end', flex: 1 }} onPress={() => changeButtonColor('Reset')}>
                        <Text style={[styles.QuantPes, { color: '#0000ff' }]}>(Ver tudo)</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>

                    <View style={styles.produtosTotal}>

                        {!viewProd ? obterLista() : listaFiltrada()}


                    </View>


                </ScrollView>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    containerHeader: {
        flexDirection: 'row',
        marginTop: '6%',
        marginLeft: '4%',
        marginRight: '4%',
    },
    containerFilter: {
        flexDirection: "row",
        alignItems: 'center',
        height: 60,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: '4%',
        marginRight: '4%',
    },
    viewBoasvinda: {
        justifyContent: 'center',
        marginLeft: 10
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 20

    },

    imageProd: {
        flex: 1,
        marginTop: 5,
        width: '80%',
        borderRadius: 20,
        resizeMode: "contain"

    },
    buscaProdutos: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        height: 50,
        paddingLeft: 10,
        marginRight: 4,
        borderRadius: (200 * 0.09),
        backgroundColor: '#ffffff',

    },
    filtraProdutos: {
        backgroundColor: '#556b2f',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 60,
        borderRadius: (200 * 0.06)
    },
    cateProdutosrow: {
        flex: 1,
        flexDirection: 'row',

    },
    categoriasProdutos: {
        flex: 1,
        marginTop: 5,
        marginLeft: '4%',
        marginRight: '4%',

    },
    resultados: {
        flex: 10,
        marginTop: 5,
    },
    input: {
        color: '#000000',
        fontSize: 16,

    },
    txtBoasvinda: {
        color: '#000000',
        fontSize: 22,
        fontWeight: 'bold'
    },
    txtNomeProd: {
        fontWeight: 'bold',
        fontSize: 16,
        flexWrap: 'wrap',
    },
    txtSizeProd: {
        color: '#000000',
        fontSize: 11,

    },
    txtPrecoProd: {
        color: '#0000ff',
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 10,
    },
    viewDescrProd: {
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        marginLeft: 200 * 0.1,


    },
    TexPesq: {
        fontSize: 16
    },
    QuantPes: {
        fontSize: 14,
    },
    menuList: {
        flex: 1,
        alignItems: 'flex-end',
        marginTop: '6%'
    },
    produtosTotal: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    categoProduFiltro: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#78866B',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
    },
    containerBlock: {
        height: Dimensions.get('window').width / 1.6,
        width: Dimensions.get('window').width / 2.2,
        backgroundColor: '#ffffff',
        marginLeft: 200 * 0.05,
        borderRadius: 15,
        alignItems: 'center',


    }

})