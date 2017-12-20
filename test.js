select minute_3, minute_5, minute_other
from
    (select checkerId, checkerName, count(id) minute_3
    from eventTAT
    where duration < 3),
    
    select checkerId, checkerName, count(id) minute_3
    from eventTAT
    where duration < 3 and shopId = '1'
    group by checkerId, checkerName



    select t1.checkerId, t1.checkerName, minute_3, minute_5, minute_other
    from
        (select checkerId, checkerName, count(id) minute_3
        from eventTAT
        where type = 2 and duration < 3 and shopId = '1'
        group by checkerId, checkerName) t1,
        (select checkerId, checkerName, count(id) minute_5
        from eventTAT
        where duration > 3 and duration < 5 and shopId = '1'
        group by checkerId, checkerName) t2,
        (select checkerId, checkerName, count(id) minute_other
        from eventTAT
        where duration > 5 and shopId = '1'
        group by checkerId, checkerName) t3
    where t1.checkerId = t2.checkerId and t2.checkerId = t3.checkerId
        
        
    
    