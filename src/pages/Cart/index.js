import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image

} from 'react-native'

import { imagens } from '../Initial/imagens';
import Ionicons from '@expo/vector-icons/Ionicons';
import produtoscarrinho from '../../services/sqlite/produtoscarrinho';

export default function Cart() {
    const [precototal, setprecototal] = useState(0)
    const [views, setViews] = useState([]);
    const [condicaoView, setcondicaoView] = useState(true);
    const [frete, setFrete] = useState(35.90)
    const excluirProdutos = (idProduto) => {
        produtoscarrinho.remove(idProduto)
            .then(updated => console.log('Cars removed: ' + updated))
            .catch(err => console.log(err))
        setcondicaoView(true)
    }

    const adicionarProdutos = () => {
        setcondicaoView(false)

        produtoscarrinho.all()
            .then((objeto) => {
                if (objeto) {

                    let valortotal = 0
                    objeto.map((objeto) => {
                        valortotal = valortotal + (objeto.preco * objeto.unidProd)
                        setprecototal(valortotal.toFixed(2))
                    })

                    const novaView = objeto.map((objeto) => (
                        <View style={styles.containerBlock} key={objeto.id}>

                            <Image
                                source={imagens.imagem[objeto.idproduto]}
                                style={styles.imageProd}
                                placeholder={'teste'}
                                resizeMode="contain"
                            />

                            <View style={{ flex: 2, justifyContent: 'center' }}>
                                <View>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                        {objeto.nomeproduto}
                                    </Text>

                                </View>

                                <Text style={{ fontSize: 18 }}>
                                    size: {objeto.size}
                                </Text>
                                <Text style={{ color: '#0000ff', fontSize: 22, fontWeight: 'bold' }}>
                                    R$ {objeto.preco.toFixed(2)}
                                </Text>
                            </View>
                            <View style={{ justifyContent: 'space-between' }}>
                                <View style={{ alignItems: 'flex-end', backgroundColor: '#0000000' }}>
                                    <TouchableOpacity onPress={() => excluirProdutos(objeto.id)}>
                                        <Ionicons name="close-circle-outline" size={30} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flexDirection: 'row', marginRight: '6%', marginBottom: '20%' }}>
                                    <TouchableOpacity onPress={() => diminuirPrecoProduto(objeto.id, objeto.unidProd)} >
                                        <Ionicons name='remove-outline' size={24} />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 19, marginLeft: 4, marginRight: 4 }}> {objeto.unidProd}</Text>
                                    <TouchableOpacity onPress={() => aumentarPrecoProduto(objeto.id, objeto.unidProd)} >
                                        <Ionicons name='add-outline' size={24} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>

                    ));
                    setViews(novaView);
                } else {
                    console.log("Nenhum registro encontrado na tabela.");

                }
            })
            .catch((error) => {
                console.error("Erro ao obter o objeto:", error);
            });


    };

    const aumentarPrecoProduto = (idProduto, uniProduto) => {
        produtoscarrinho.update(idProduto, { unidProd: uniProduto + 1 })
            .then(updated => console.log('produto updated: ' + updated))
            .catch(err => console.log(err))


        setcondicaoView(true)
    }
    const diminuirPrecoProduto = (idProduto, uniProduto) => {
        if (uniProduto === 1) {
            return
        }

        produtoscarrinho.update(idProduto, { unidProd: uniProduto - 1 })
            .then(updated => console.log('produto updated: ' + updated))
            .catch(err => console.log(err))

        setcondicaoView(true)
    }

    return (

        <View style={styles.container}>

            <View style={styles.headercarrinho}>
                <Text style={{ color: '#000000', fontSize: 22, fontWeight: 'bold' }}>Carrinho</Text>
            </View>

            <ScrollView style={{ flex: 3 }}>

                {condicaoView ? adicionarProdutos() : null}

                {views.map((view, index) => (

                    <React.Fragment key={index}>{view}</React.Fragment>

                ))}

                {/* {buscaProdutosCarrinho()} */}
            </ScrollView>

            <View style={styles.cupomDesconto}>
                <TextInput placeholder='Cupom de desconto' fontSize={16} />
                <TouchableOpacity style={styles.buttomCupomDesconto} onPress={() => { console.log('faz nada') }}>
                    <Text style={[styles.fontsize, { color: 'white' }]}>Aplicar</Text>
                </TouchableOpacity>
            </View>

            <View style={{ height: 80 }}>
                <View style={[styles.totalfrete, { marginTop: 10, marginBottom: 5 }]}>
                    <Text style={styles.fontsize}>Valor dos produtos:</Text>
                    <Text style={styles.fontsize}>R$ {precototal} </Text>
                </View>
                <View style={[styles.totalfrete, { borderBottomWidth: 1 }]}>
                    <Text style={styles.fontsize}>Frete:</Text>
                    <Text style={styles.fontsize}>R$ {frete.toFixed(2)} </Text>
                </View>
            </View>

            <View style={styles.finalizarcompra}>
                <View style={{ color: '#0000ff', flex: 1,  flexDirection: 'row', flexWrap: 'wrap'}}>
                    <Text style={[styles.fontsize, { color: '#FFF',flexWrap: 'wrap' }]}>R$ {(Number(precototal) + Number(frete)).toFixed(2).toString()}</Text>
                </View>



                <View style={{ color: '#FFF', flexWrap: 'wrap',  flex: 2 }}>
                    <TouchableOpacity style={[styles.buttomFinalizarCompra]}>
                        <Text style={styles.fontsize}>IR PARA O PAGAMENTO</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        marginTop: '6%',
        marginStart: '4%',
        marginEnd: '4%',
    },
    headercarrinho: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 40,

    },
    cupomDesconto: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#FFF',
        elevation: 4,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: '5%',
        paddingRight: '5%',
        borderRadius: 100 * 0.35
    },
    fontsize: {
        fontSize: 16
    },
    totalfrete: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    finalizarcompra: {
        height: 70,
        backgroundColor: '#0000ff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 200 / 2,
        alignItems: 'center',
        paddingLeft: '8%',
        paddingRight: '4%',
    },
    buttomFinalizarCompra: {
        backgroundColor: '#FFF',
        height: 40,
        width: 200,
        borderRadius: 200 / 2,
        justifyContent: 'center',
        alignItems: 'center',


    },
    imageProd: {
        flex: 1,
        height: 130,
        marginTop: 5,
        borderRadius: 20,
        resizeMode: "contain",

    },
    containerBlock: {
        flex: 1,
        height: Dimensions.get('window').width / 2.4,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        flexDirection: 'row',
        marginBottom: 10
    },
    buttomCupomDesconto: {
        backgroundColor: '#0000ff',
        width: 90,
        height: 45,
        borderRadius: 200 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

})