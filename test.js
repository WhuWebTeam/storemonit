
count1 = [
    {
        checkerid: "1",
        checkername: "xj",
        count: "2"
    }
],
count2 = [
    {
        checkerid: "1",
        checkername: "xj",
        count: "1"
    },
    {
        checkerid: "2",
        checkername: "jj",
        count: "1"
    }
],
count3 = []



const temp = {};
count1.map(obj => {
    if (!temp[obj.checkerid]) {
        temp[obj.checkerid] = {
            checkerId: obj.checkerid,
            checkerName: obj.checkername,
            count1: +obj.count,
            count2: 0,
            count3: 0,
        }
    }
});

count2.map(obj => {
    if (!temp[obj.checkerid]) {
        temp[obj.checkerid] = {
            checkerId: obj.checkerid,
            checkerName: obj.checkername,
            count1: 0,
            count2: +obj.count,
            count3: 0
        }
    } else {
        temp[obj.checkerid].count2 =  +obj.count;
    }
});


count3.map(obj => {
    if (!temp[obj.checkerid]) {
        temp[obj.checkerid] = {
            checkerId: obj.checkerid,
            checkerName: obj.checkername,
            count1: 0,
            count2: 0,
            count3: +obj.count,
        }
    } else {
        temp[obj[checkerid]].count3 =  +obj.count;
    }
});


console.log(Object.values(temp));