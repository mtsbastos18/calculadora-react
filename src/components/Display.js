import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'


const styles = StyleSheet.create({
    display: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: '#f0f0f0',
        alignItems: "flex-end"
    },
    displayValue: {
        fontSize: 60,
        color: '#000',
    },
    displaySecond: {
        fontSize: 32,
        color: '#000',
    }
})

export default props => {
    const stylesDisplay = [styles.displayValue] 
    if (props.second) stylesDisplay.push(styles.displaySecond)
    return (
    <View style={styles.display}>
        <Text style={stylesDisplay} numberOfLines={1}>{props.value}</Text>
    </View>
    )
}