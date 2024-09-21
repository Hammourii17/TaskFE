import React from 'react';
import { View,Text,FlatList, StyleSheet } from 'react-native';

const DataTable = ({ data, columns }) => {
return ( 
    <View>
    <View style={styles.tableHeader}>
      {columns.map((column, index) => (
        <Text key={index} style={styles.headerText}>{column}</Text>
      ))}
    </View>

    <FlatList
      data={data}
      keyExtractor={( item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.tableRow}>
          {Object.values(item).map((value, index) => ( 
            <Text key={index} style={styles.rowText}>{value}</Text>
          ))}
        </View>
      )}
    />
  </View>
);
};

const styles = StyleSheet.create({
tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f8ff',
    padding: 10,
    },
headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    },
tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f8ff',
    },
rowText: {
    flex: 1,
    fontSize: 18,
    },
});

export default DataTable;