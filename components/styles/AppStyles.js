import { StyleSheet } from 'react-native';

export const AppStyles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    buttonText: {},
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16
    },
    title: {
        fontWeight: 'bold',
        marginTop: 20,
        fontSize: 25,
        color: 'rgba(231,76,60,1)'
    },
    subTitle: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 20,
    },
    customContainer: {
        flex: 1,
        marginTop: 10,
        alignItems: 'center',
    },
}