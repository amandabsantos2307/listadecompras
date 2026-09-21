import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function App() {
  const [product, setProduct] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  const addProduct = () => {
    const name = product.trim();

    if (!name) {
      setError('Digite um produto antes de adicionar.');
      return;
    }

    const alreadyExists = products.some(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );

    if (alreadyExists) {
      setError('Este produto já está na lista.');
      return;
    }

    setProducts((currentProducts) => [
      { id: Date.now(), name, bought: false },
      ...currentProducts,
    ]);
    setProduct('');
    setError('');
  };

  const removeProduct = (id) => {
    setProducts((currentProducts) =>
      currentProducts.filter((item) => item.id !== id)
    );
  };

  const toggleBought = (id) => {
    setProducts((currentProducts) =>
      currentProducts.map((item) =>
        item.id === id ? { ...item, bought: !item.bought } : item
      )
    );
  };

  const clearList = () => {
    setProducts([]);
    setError('');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.card}>
        <Text style={styles.title}>Minha Lista de Compras</Text>
        <Text style={styles.counter}>Produtos: {products.length}</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={product}
            onChangeText={setProduct}
            placeholder="Digite um produto..."
            placeholderTextColor="#7b8194"
          />

          <Pressable onPress={addProduct} style={styles.addButton}>
            <Text style={styles.addButtonText}>ADICIONAR</Text>
          </Pressable>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable
          onPress={clearList}
          style={[
            styles.clearButton,
            products.length === 0 && styles.clearButtonDisabled,
          ]}
          disabled={products.length === 0}
        >
          <Text style={styles.clearButtonText}>LIMPAR LISTA</Text>
        </Pressable>

        {products.length === 0 ? (
          <Text style={styles.emptyText}>Sua lista está vazia.</Text>
        ) : (
          <View style={styles.list}>
            {products.map((item) => (
              <View
                key={item.id}
                style={[styles.productRow, item.bought && styles.productRowBought]}
              >
                <Text
                  style={[styles.productName, item.bought && styles.productNameBought]}
                >
                  {item.name}
                </Text>

                <View style={styles.actionsRow}>
                  <Pressable
                    onPress={() => toggleBought(item.id)}
                    style={[
                      styles.buyButton,
                      item.bought && styles.buyButtonBought,
                    ]}
                  >
                    <Text
                      style={[
                        styles.buyButtonText,
                        item.bought && styles.buyButtonTextBought,
                      ]}
                    >
                      {item.bought ? 'COMPRADO' : 'COMPRAR'}
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => removeProduct(item.id)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeButtonText}>❌</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121a2b',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#1d273d',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f5f7ff',
    marginBottom: 12,
    textAlign: 'center',
  },
  counter: {
    fontSize: 16,
    color: '#bdd6ff',
    marginBottom: 18,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#eef3ff',
    color: '#1a1f2c',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#5ec59f',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  addButtonText: {
    color: '#0a1d16',
    fontWeight: '700',
    fontSize: 14,
  },
  errorText: {
    color: '#ffb4b4',
    fontSize: 13,
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#ff7b7b',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 18,
  },
  clearButtonDisabled: {
    opacity: 0.4,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  emptyText: {
    color: '#c9d5ef',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  list: {
    marginTop: 8,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2d3b57',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  productRowBought: {
    backgroundColor: '#1d4d3f',
  },
  productName: {
    flex: 1,
    color: '#f5f7ff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  productNameBought: {
    textDecorationLine: 'line-through',
    color: '#bae7d2',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buyButton: {
    backgroundColor: '#6fa8ff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 8,
  },
  buyButtonBought: {
    backgroundColor: '#45c985',
  },
  buyButtonText: {
    color: '#101827',
    fontSize: 12,
    fontWeight: '700',
  },
  buyButtonTextBought: {
    color: '#052e1d',
  },
  removeButton: {
    backgroundColor: '#f3b5b5',
    borderRadius: 10,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    fontSize: 16,
    lineHeight: 18,
  },
});
