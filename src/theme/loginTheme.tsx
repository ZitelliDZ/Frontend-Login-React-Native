import { StyleSheet } from "react-native";


export const loginStyles = StyleSheet.create({
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#fff'
    },
    label:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginTop:25
    },
    buttonContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    button:{
        width: 150,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderWidth:2,
        borderColor: '#fff',
    },
    buttonText:{
        fontSize: 18,
        color: '#fff'
    },
    buttonTextNewUser:{
        fontSize: 14,
        color: '#fff',
        marginTop:40
    },
    newUserContainer:{
        alignItems: 'flex-end',
        marginTop: 10
    },
    formContainer:{
        flex: 1,
        paddingHorizontal:30,
        justifyContent: 'center',
        marginBottom:100
    },
    buttonNewUser:{
        borderColor:'rgba(255,255,255,0.2)',
        borderBottomWidth:2,
        paddingBottom:3
    }
})