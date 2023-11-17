import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignIn from '../pages/SignIn'
import Create from '../pages/SignIn/Create'
import Forgot from '../pages/SignIn/Forgot'
import Initial from '../pages/Initial'
import Produto from '../pages/ProdutoView'
import Cart from '../pages/Cart'

const Stack = createNativeStackNavigator();

export default function Routes() {
    return( 
        <Stack.Navigator>
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{headerShown: false}}
            /> 

            <Stack.Screen
                name="Create"
                component={Create}
                options={{headerShown: false}}
            /> 

            
            <Stack.Screen
                name="Forgot"
                component={Forgot}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="Initial"
                component={Initial}
                options={{headerShown: false}}
            />
            
            <Stack.Screen
                name="Produto"
                component={Produto}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Cart"
                component={Cart}
                options={{headerShown: false}}
            />

    
        </Stack.Navigator>
    )
}