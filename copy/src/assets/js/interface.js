/**
 * Created by Administrator on 2017/7/24.
 */
let host = '' //192.168.0.34   ,  http://112.74.136.96
export default{
  getGrade : host+'/school/scoreRecord_getListScoreRecord.do?method=getGradeByMobile',//sid
  getRank : host+'/school/scoreRecord_getListScoreRecord.do?method=getClassRankingByMobile',//sid gid
  getDetails : host+'/school/scoreRecord_getListScoreRecord.do?method=showScoreRecordListByMobile'//sid classid time
}
