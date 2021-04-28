import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import React from 'react';

export default function FlatButton({text, onPress}) {
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text>{ text }</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10
    }
})