import React, { useEffect, useState } from 'react'
import { Text, View, TextInput, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import OpenAI from 'openai-api'
import ApiKey from '../../../../env'

export default function Gpt() {
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('ここにGPT-3が生成した文章が入ります')
  const [isLoading, setIsLoading] = useState(false)
  const height = Dimensions.get('window').height
  const openai = new OpenAI(ApiKey)

  useEffect(() => {
    console.log('Gpt screen')
  }, [])

  const generateMessage = async() => {
    setIsLoading(true)
    const prompt = comment
    const gptResponse = await openai.complete({
      engine: 'davinci',
      prompt: prompt,
      maxTokens: 300,
      temperature: 0.9,
      topP: 1,
      presencePenalty: 0,
      frequencyPenalty: 0,
      bestOf: 1,
      n: 1,
      stream: false,
      stop: ['\n', "testing"]
    });
    console.log(gptResponse.data)
    const responseMessage = gptResponse.data.choices[0].text
    setMessage(responseMessage)
    setIsLoading(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          multiline
          style={[styles.input, {height: height*0.3, backgroundColor: 'snow'}]}
          placeholder=''
          placeholderTextColor="#aaaaaa"
          value={message}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          editable={false}
        />
        <TextInput
          multiline
          style={[styles.input, {height: height*0.3, marginTop: 20}]}
          placeholder=''
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setComment(text)}
          value={comment}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => generateMessage()}
        >
          {!isLoading?
          <Text style={styles.buttonText}>Generate</Text>:
          <ActivityIndicator size="small" color="#0000ff" />
          }
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    height: 48,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingHorizontal: 10
  },
  button: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#788eec'
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  },
})
