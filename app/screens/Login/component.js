import React, { Component } from 'react';
import { AsyncStorage, ToastAndroid } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Body, Title, Right, Button, Text } from 'native-base';
import styles from './styles';
// eslint-disable-next-line import/first
import { SwitchActions } from 'react-navigation';
// eslint-disable-next-line import/extensions
import I18n from '../../i18n';

export default class FormExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.login = this.login.bind(this);
  }
  login = async () => {
    const { email, password } = this.state;
    const payload = {
      email,
      password
    };
    ToastAndroid.post('http://ec2-3-81-168-96.compute-1.amazonaws.com/api/login', payload)
      .then(async value => {
        await AsyncStorage.setItem('access_token', value.data.access_token);
        ToastAndroid.show('Success', ToastAndroid.SHORT);
        this.props.navigation.dispatch(SwitchActions.jumpTo({ routeName: 'Home' }));
      })
      .catch(err => {
        ToastAndroid.show('Error', ToastAndroid.SHORT);
        console.log(err);
      });
  };
  render() {
    const { email, password } = this.state;
    return (
      <Container padder>
        <Header>
          <Body>
            <Title>{I18n.t('forgetPass')}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item>
              <Input
                placeholder="Email"
                value={email}
                onChangeText={value => this.setState({ email: value })}
              />
            </Item>
            <Item>
              <Input
                placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={value => this.setState({ password: value })}
              />
            </Item>
            <Button block style={[styles.mt_2, styles.my_1]} onPress={this.login}>
              <Text>Sign In</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
