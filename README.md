# Say Hello

## Run it

```bash
# program
cd beginner
leo execute leo execute say_hello --endpoint https://api.explorer.aleo.org/v1 --private-key APrivateKey1xxxx --network testnet
leo execute generate_record aleo1xxxxxx 1u64 --endpoint https://api.explorer.aleo.org/v1 --private-key APrivateKey1xxxxx --network testnet
```

```bash
# frontend
cd aleo-project
npm install
npm run dev
```

```bash
# owner address
# aleo1lkh6qgv4a0ng522emht7ua0f4mw4mxd5gdx4ntmlnrr6gylmsvxsqa9umf
# program id
# beginner_v0001.aleo
# signature
# sign1ej3r6xy995zr4ree284dzw0ejuqhmaclxq94n94wepjlj29u2spt9ltdsfmkjm2q0nav0a3lsthlmcdhynuh66n88zsdvayvma33uq5cg6z2c28dyf72v8a0vg5fdxl06nxc9yc9g3jn9h4rq0rl0ekhqk6nycmc9fmrzceatmhxl85nnuszz27t8sjzl726vfm389apwtps7d8cm5j
```

## Play it

Everybody can click `Click to say hello` to interact with program which will increase the `global count` by 1 and `personal count` by 1.

Then you can click `Click to generate record` to cost `personal count` to generate a record. At the same time, the `global count` will not be changed.
