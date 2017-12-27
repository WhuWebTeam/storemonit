

module.exports = app => {

    const BaseController = require('./baseController')(app);

    class Area extends BaseController {

        // index test
        async index() {
            this.response(200, 'index test successed');
        }


        // query info of all areas
        async getAreas() {
            const areas = await this.service.areas.query({}, ['id', 'name', 'details']);
            this.response(200, areas);
        }


        // modify info of some area specified by id
        async modifyArea() {
            const id = this.ctx.params.areaId;

            // area without id attribute
            const area = this.ctx.request.body;

            // add attribute id to area
            area.id = id;

            if (!await this.service.areas.update(area)) {
                this.response(403, 'update area info failed');
                return;
            }

            this.response(203, 'update area info successed');
        }


        // add a area record to areas
        async addArea() {
            const area = this.ctx.request.body;
            const id = this.ctx.params.areaId;
            area.id = id;

            // area id doesn't exist
            if (!area.id) {
                this.response(403, 'area id must exists');
                return;
            }

            // area exists
            if (!await this.service.areas.insert(area)) {
                this.response(403, 'area exists');
                return;
            }

            this.response(203, 'add area record successed');
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
                this.response(404, 'delete some area info failed');
                return;
            }

            thi.response(204, 'delete all area satisfied condition successed');
        }
    }

    return Area;
}