const http = require('http');

const options = (method, path, body = null) => {
    return {
        hostname: 'localhost',
        port: 5000,
        path: `/api/menus${path}`,
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': body ? Buffer.byteLength(body) : 0
        }
    };
};

const request = (method, path, data = null) => {
    return new Promise((resolve, reject) => {
        const body = data ? JSON.stringify(data) : null;
        const req = http.request(options(method, path, body), (res) => {
            let responseBody = '';
            res.on('data', (chunk) => responseBody += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(responseBody ? JSON.parse(responseBody) : {});
                } else {
                    reject({ statusCode: res.statusCode, message: responseBody });
                }
            });
        });

        req.on('error', (e) => reject(e));
        if (body) req.write(body);
        req.end();
    });
};

const runTests = async () => {
    try {
        console.log('--- Testing Menu APIs ---');

        // 1. Create Menu
        console.log('\n1. Creating Menu...');
        try {
            const createRes = await request('POST', '', {
                name: 'Test Menu',
                route: '/test-menu',
                icon: 'test_icon'
            });
            console.log('Created:', createRes);
            var menuId = createRes.id;
        } catch (e) {
            console.error('Create Failed:', e);
            return;
        }

        // 2. Get All Menus
        console.log('\n2. Getting All Menus...');
        try {
            const getAllRes = await request('GET', '');
            console.log(`Retrieved ${getAllRes.length} menus.`);
            const found = getAllRes.find(m => m.id === menuId);
            if (found) console.log('Found newly created menu in list.');
            else console.error('ERROR: Newly created menu NOT found in list.');
        } catch (e) {
            console.error('Get All Failed:', e);
        }

        // 3. Update Menu
        console.log('\n3. Updating Menu...');
        try {
            const updateRes = await request('PUT', `/${menuId}`, {
                name: 'Updated Test Menu'
            });
            console.log('Updated:', updateRes);
            if (updateRes.name === 'Updated Test Menu') console.log('Update verified.');
            else console.error('ERROR: Update failed verification.');
        } catch (e) {
            console.error('Update Failed:', e);
        }

        // 4. Delete Menu
        console.log('\n4. Deleting Menu...');
        try {
            await request('DELETE', `/${menuId}`);
            console.log('Deleted successfully.');
        } catch (e) {
            console.error('Delete Failed:', e);
        }

        // 5. Verify Delete
        console.log('\n5. Verifying Delete...');
        try {
            await request('GET', `/${menuId}`);
            console.error('ERROR: Menu still exists after delete!');
        } catch (e) {
            if (e.statusCode === 404) {
                console.log('Verification successful (404 expected).');
            } else {
                console.error('Error verifying delete:', e);
            }
        }

        console.log('\n--- Tests Completed ---');

    } catch (error) {
        console.error('Test Suite Failed:', error);
    }
};

runTests();
