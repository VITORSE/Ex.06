const http = require('http');
const https = require('https');


const apiUrl = 'https://dog.ceo/api/breeds/image/random';


const server = http.createServer((req, res) => {
    
    https.get(apiUrl, (apiRes) => {
        let data = '';

       
        apiRes.on('data', (chunk) => {
            data += chunk;
        });

        
        apiRes.on('end', () => {
            try {
                const responseData = JSON.parse(data);
                
                // Extraindo a URL da imagem do cachorro
                const imageUrl = responseData.message;

                //mostrar imagem do cachorro no html
                const htmlResponse = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Imagem do Cachorro</title>
                    </head>
                    <body>
                        <h1>Imagem do Cachorro</h1>
                        <img src="${imageUrl}" alt="Imagem do Cachorro">
                    </body>
                    </html>
                `;

               
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(htmlResponse);
                res.end();
            } catch (error) {
                console.error('Erro ao analisar os dados da API:', error);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Erro ao analisar os dados da API.');
            }
        });
    }).on('error', (err) => {
        console.error('Erro ao fazer solicitação para a API:', err.message);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erro ao solicitar dados da API.');
    });
});


const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
