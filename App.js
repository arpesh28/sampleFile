import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import {FlatList, Image} from 'react-native'
// import {} from 'react-native-bidirectional-infinite-scroll'
import {useEffect, useState} from 'react'
import axios from 'axios';

export default function App() {
  const [data,setData] = useState([])
  const [page, setPage] = useState(10)
  useEffect(()=>{
   getData()
  },[])
  const getData = ()=>{
     axios.get(`https://randomuser.me/api?page=1&results=${page}`)
    .then(function (response) {
      // console.log(response&&response.data&&response.data.results);
      // setData((prev)=>[...prev,response&&response.data&&response.data.results])
      if(response&&response.data&&response.data.results)
      setData((prev)=>[...prev, ...response.data.results])
      // data.push(response&&response.data&&response.data.results)
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  console.log('data:',data)
  const handleLoadMore = () => {
    setPage(page+10,()=>getData())
    console.log('load more item')
    getData()
  }
  return (
    <View style={styles.container}>
      <FlatList
                data={data}
                renderItem={({item,index}) => 
                    <View key={index}>  
                        <Text style={styles.viewDetail}>{item&&item.name&&item.name.title}  {item&&item.name&&item.name.first} {item&&item.name&&item.name.last}</Text>
                        <Image source={item&&item.picture&&item.picture.medium} resizeMode='contain' style={{height:50, width:50}} />
                    </View>
                }
                keyExtractor={(item,index) => index}
                onEndReached={handleLoadMore}
                // onEndReachedThreshold={0}
           />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop:40,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
