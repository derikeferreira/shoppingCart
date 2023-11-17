import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions,
    Modal,

} from 'react-native'

import Ionicons from '@expo/vector-icons/Ionicons'
import { useRoute, useNavigation } from '@react-navigation/native';
import { imagens } from '../Initial/imagens';
import produtoscarrinho from '../../services/sqlite/produtoscarrinho';

export default function Initial() {
    const navigation = useNavigation();
    const route = useRoute();
    const { idprod, nomeProd, preco, size, unidMedi } = route.params
    const [precoProduto, setPrecoProduto] = useState(preco)
    const [quantiProd, setquantiProd] = useState(1)
    const [isModalVisible, setModalVisible] = useState(false)

    const addToCart = () => {
        criaProduto = true
        produtoscarrinho.all()
            .then((objeto) => {
                if (objeto) {

                    objeto.map((objeto) => {

                        if (objeto.nomeproduto === nomeProd) {
                            criaProduto = false
                            produtoscarrinho.update(objeto.id, { unidProd: quantiProd + objeto.unidProd })
                                .then(updated => console.log('produto updated: ' + updated), setModalVisible(true), setTimeout(() => { setModalVisible(false); }, 1000))
                                .catch(err => console.log(err))

                        }
                        
                    });
                
                    if (criaProduto) {
                        produtoscarrinho.create({ idproduto: idprod, nomeproduto: nomeProd, preco: preco, size: size, unidademedida: unidMedi, unidProd: quantiProd })
                            .then(() =>  console.log('produto created with id '), setModalVisible(true), setTimeout(() => { setModalVisible(false); }, 1000))
                            .catch(err => console.log(err))
                    }

                } else {
                    console.log("Nenhum registro encontrado na tabela.");

                }
            })
            .catch((error) => {
                console.error("Erro ao obter o objeto:", error);
            });
       


    };

    function aumentarPrecoProduto() {
        setquantiProd(quantiProd + 1)
        setPrecoProduto((preco * (quantiProd + 1)).toFixed(2))
    }
    function diminuirPrecoProduto() {
        quantiProd > 1 ? setquantiProd(quantiProd - 1) : setquantiProd(1)
        quantiProd > 1 ? setPrecoProduto((precoProduto - preco).toFixed(2)) : setPrecoProduto(preco)

    }

    return (

        <View style={styles.container}>
            <View style={styles.menuList}>
                <TouchableOpacity style={{ transform: [{ scaleX: -1 }] }} onPress={() => { navigation.navigate('Cart') }}>
                    <Ionicons name="cart-outline" size={35} />
                </TouchableOpacity>
            </View>
            <View style={styles.containerBlock}>
                <Image
                    source={imagens.imagem[idprod]}
                    style={styles.imageProd}
                    placeholder={'teste'}
                    resizeMode="contain"
                />
            </View>
            <View style={{ flex: 1, marginTop: '4%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                    <Text style={styles.NomeProd}>
                        {nomeProd}
                    </Text>


                    <View style={styles.ModelClas}>
                        <Ionicons name='star-outline' size={26} />
                        <Ionicons name='star-outline' size={26} />
                        <Ionicons name='star-outline' size={26} />
                        <Ionicons name='star-outline' size={26} />
                        <Ionicons name='star-outline' size={26} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, marginLeft: '6%', marginRight: '6%' }}>
                    <Text >{size} {unidMedi}</Text>
                    <Text style={{ marginRight: '7%', paddingBottom: 15 }} >(0 Reviews)</Text>
                </View>

            </View>

            <View style={styles.DescricaoProd}>
                <Text style={{ fontSize: 20, paddingBottom: 12 }}>Descrição</Text>
                <ScrollView>
                    <Text>Este é um produto de alta qualidade que atende às diversas necessidades dos nossos clientes. Ele foi cuidadosamente projetado e fabricado para oferecer funcionalidade excepcional e durabilidade. Com uma variedade de recursos versáteis, este item é adequado para várias situações e pode ser uma escolha confiável em diferentes cenários.
                        Seu design elegante combina forma e função, garantindo que ele se destaque visualmente enquanto atende às exigências práticas. Aproveite a conveniência deste produto e descubra como ele pode facilitar a sua vida.
                        Estamos comprometidos em fornecer produtos de alta qualidade e satisfazer as necessidades dos nossos clientes, e este é mais um exemplo do nosso compromisso com a excelência. Compre agora e experimente a qualidade que temos orgulho de oferecer.
                    </Text>
                </ScrollView>
            </View>

            <View style={styles.ViewComprar}>
                <Text style={{ fontSize: 20 }} >R$ {precoProduto}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={diminuirPrecoProduto} >
                        <Ionicons name='remove-outline' size={24} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 19, marginLeft: 4, marginRight: 4 }}> {quantiProd.toString().length > 1 ? quantiProd : '0' + quantiProd}</Text>
                    <TouchableOpacity onPress={aumentarPrecoProduto} >
                        <Ionicons name='add-outline' size={24} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.buttonComprar} onPress={() => addToCart()}>
                    <Text style={{ color: 'white', fontSize: 15 }}>Carrinho</Text>
                </TouchableOpacity>
                {/* Modal de feedback */}
                <Modal visible={isModalVisible} transparent={true}>
                    <View style={styles.modalMensagem}>
                        <Text style={{ color: '#000000', fontSize: 20, fontWeight: 'bold', }}>Produto adicionado ao carrinho!</Text>
                    </View>
                </Modal>

            </View>



        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 20,

    },

    imageProd: {
        flex: 1,
        marginTop: 5,
        width: '80%',
        borderRadius: 20,
        resizeMode: "contain"

    },
    input: {
        color: '#000000',
        fontSize: 16,

    },
    menuList: {
        alignItems: 'flex-end',
        marginRight: '6%',
        marginTop: '6%'
    },
    containerBlock: {
        height: Dimensions.get('window').width / 1.1,
        width: Dimensions.get('window').width / 1.4,
        backgroundColor: '#ffffff',
        marginTop: '3%',
        borderRadius: 15,
        alignItems: 'center',
        alignSelf: 'center',
        elevation: 5


    },
    ModelClas: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: '6%',


    },
    NomeProd: {
        marginLeft: '6%',
        fontSize: 26
    },
    DescricaoProd: {
        flex: 2,
        marginLeft: '6%',
        marginRight: '10%',


    },
    ViewComprar: {
        flex: 1,
        elevation: 2,
        backgroundColor: '#FFF',
        marginLeft: '4%',
        marginRight: '4%',
        marginBottom: '2%',
        marginTop: '1%',
        borderRadius: 200 * 0.4,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '6%',
        paddingRight: '4%',

    },
    buttonComprar: {
        backgroundColor: '#0000ff',
        width: 90,
        height: 45,
        borderRadius: 200 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalMensagem: {
        backgroundColor: '#FFF',
        marginTop: '160%',
        flexDirection: 'row',
        marginStart: '5%',
        marginEnd: '5%',
        height: 40,
        paddingEnd: '10',
        borderRadius: 200 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 9,

    },

})