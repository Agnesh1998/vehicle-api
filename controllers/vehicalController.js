const fetch = require('node-fetch');

// Display Homepage
exports.index = function (req, res) {
    res.render('vehical', { title: 'Vehical', vin: '' });
};

// Show information for given VIN
exports.decodeVin = function (req, res) {
    let vin = req.body.vin ? req.body.vin : '';
    //3N1AB6AP7BL729215
    if(vin){
        fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(data => {
                if (data.Results) {
                    let error_code = data.Results.filter(x => x.VariableId==143)[0];
                    if(Number(error_code.Value)==0){
                        let make = data.Results.filter(x => x.VariableId==26)[0].Value;
                        let manufacturer = data.Results.filter(x => x.VariableId==27)[0].Value;
                        let model = data.Results.filter(x => x.VariableId==28)[0].Value;
                        let model_year = data.Results.filter(x => x.VariableId==29)[0].Value;
                        res.render('vehical', { title: 'Vehical', success: true, vin: vin,make:make, year:model_year, model:model });
                    }else{
                        res.render('vehical', { title: 'Vehical', success: false , vin:vin, error: error_code.Value });
                    }
                }else{
                    res.render('vehical', { title: 'Vehical', success: false , vin: vin });
                }
            });
    }else{
        res.render('vehical', { title: 'Vehical', vin: vin });
    }

};

// Show information for all manufacturers
exports.all_manufacturers = function (req, res) {
    let page = req.query.page ? req.query.page : 1;
    let next_page = page>1 ? page+1 : 2;
    let prev_page = page>1 ? page-1 : 1;
    //i.e. 3N1AB6AP7BL729215
    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json&page=${page}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
        .then(res => res.json())
        .then(data => {
            if (data.Count>0) {
                if(data.Results){
                    res.render('vehical_manufacturer', { title: 'Vehical', success: true, manufacturers: data.Results, page: page, next_page: next_page, prev_page: prev_page });
                }else{
                    res.render('vehical_manufacturer', { title: 'Vehical', success: false, manufacturers: [], page: page, next_page: next_page, prev_page: prev_page });
                }
            }else{
                res.render('vehical_manufacturer', { title: 'Vehical', success: false, manufacturers: [], page: page, next_page: next_page, prev_page: prev_page  });
            }
        });
};

// Show information for all makes
exports.all_makes = function (req, res) {
    let manufacturer = req.body.manufacturer ? req.body.manufacturer : '';
    //i.e. toyota
    if(manufacturer){
        fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${manufacturer}?format=json`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(data => {
                if (data.Count>0) {
                    if(data.Results){
                        res.render('vehical_manufacturer_make', { title: 'Vehical', success: true, makes: data.Results, manufacturer: manufacturer });
                    }else{
                        res.render('vehical_manufacturer_make', { title: 'Vehical', success: false, makes: [], manufacturer: manufacturer });
                    }
                }else{
                    res.render('vehical_manufacturer_make', { title: 'Vehical', success: false, makes: [], manufacturer: manufacturer  });
                }
            });
    }else{
        res.render('vehical_manufacturer_make', { title: 'Vehical', makes: [], manufacturer: manufacturer  });
    }
};