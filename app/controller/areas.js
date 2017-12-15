module.exports = app => {
    class Area extends app.Controller {

        // index test
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            }
        }


        // query info of all areas
        async getAreas() {
            const areas = await this.service.areas.query({}, ['id', 'name', 'details']);
            this.ctx.body = {
                code: 200,
                data: areas
            };
        }


        // modify info of some area specified by id
        async modifyArea() {
            const id = this.ctx.params.areaId;

            // area without id attribute
            const area = this.ctx.request.body;
            
            // add attribute id to area
            area.id = id;

            if (!await this.service.areas.update(area)) {
                this.ctx.body = this.service.util.generateResponse(403, 'update area info failed')
                return;
            }

            this.ctx.body = this.service.util.generateResponse(203, 'update area info successed');
        }



        // add a area record to areas
        async addArea() {
            const area = this.ctx.request.body;
            const id = this.ctx.params.areaId;
            area.id = id;

            // area id doesn't exist
            if (!area.id) {
                this.ctx.body = this.service.generateResponse(403, 'area id required');
                return;
            }

            // area exists
            if (!await this.service.areas.insert(area)) {
                this.ctx.body = this.service.util.generateResponse(403, 'area exists');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(200, 'add area successed');
        }

        
        // delete areas specified by id
        async removeAreas() {
            const areas = this.ctx.request.body;
            let del = true;

            

            for (const area of areas.areas) {
                if (!await this.service.areas.delete({ id: area.id })) {
                    del = false;
                }
            }

            if (!del) {
                this.ctx.body = this.service.util.generateResponse(403, 'delete some area record failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(203, 'delete areas satisfied condition successed');
        }
    }

    return Area;
}