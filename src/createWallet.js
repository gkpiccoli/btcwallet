// importando as dependências
const bip32 = require("bip32");
const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");

// definindo a rede
const network = bitcoin.networks.testnet;

// derivação de  carteiras HD
const path = "m/44'/1'/0'/0/0";

// gerando a semente e a chave mestra
let mnemonic = bip39.generateMnemonic();
let seed = bip39.mnemonicToSeedSync(mnemonic);

// criando a raiz da carteira
let root = bip32.fromSeed(seed, network);

// criando uma conta - par pvt-pub keys
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAddress = bitcoin.payments.p2pkh({
  pubkey: node.publicKey,
  network: network,
}).address;

console.log("Carteira criada com sucesso!");
console.log("Endereço: ", btcAddress);
console.log("Chave privada: ", node.toWIF());
console.log("Chave pública: ", node.publicKey.toString("hex"));
console.log("Mnemonic: ", mnemonic);
