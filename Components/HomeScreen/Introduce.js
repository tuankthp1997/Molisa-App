import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    TextInput,
    Alert
} from 'react-native';
var url = 'http://27.72.28.157:8080';
export default class Introduce extends Component {
    static navigationOptions = {
        title: 'Thông tin',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('MolisaApp/Image/thongTin.png')}
                style={{ height: 20, width: 21 }}
            />
        ),
    };

    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            Phone: '',
            Email: '',
            Address: '',
            Content: '',
        }
    }

    fetchAddfeedback = () => {
        if (this.state.Name == '' || this.state.Phone == '' || this.state.Email == '' || this.state.Address == '' || this.state.Content == '') {
            Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin');
        } else {
            try {
                var sql = url + '/api/jsonws/gdnn.api/add-feedback/name/' + this.state.Name + '/street-address/' + this.state.Address + '/phone-number/' + this.state.Phone + '/email-address/' + this.state.Email + '/content/' + this.state.Content;
                fetch(sql, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Basic YWRtaW5AZ2Rubi5nb3Yudm46MTIzNDU2',
                    },
                }).then((response) => response.json())
                    .then((response) => {
                        if (response.exception == null) {
                            Alert.alert('Thông báo', 'Gửi đi thành công');
                        } else {
                            Alert.alert('Thông báo', 'Vui lòng điền chính xác các thông tin');
                        }
                    })

            } catch (error) {
                Alert.alert('Thông báo', 'Có lỗi xảy ra');
            }
        }
    }

    render() {
        var { width } = Dimensions.get('window');
        return (
            <View style={{ flex: 1, backgroundColor: 'white', }}>
                <ScrollView>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Screen1') }}>
                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <View style={{}}>
                                <Image source={require('MolisaApp/Image/Logo.png')}
                                    style={[{ width: 65, height: 65 }]} />
                            </View>
                            <View style={{ marginTop: 10, }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#a01313' }}>BỘ LAO ĐỘNG - THƯƠNG BINH VÀ XÃ HỘI</Text>
                                <Text style={{ fontWeight: 'bold', color: 'rgb(0, 161, 199)', }}>TỔNG CỤC GIÁO DỤC NGHỀ NGHIỆP</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 8, color: '#151515' }}>DIRECTORATE OF VOCATIONAL EDUCATION AND TRAINING</Text>
                            </View>
                        </View>
                        <View style={{ borderBottomWidth: 7, borderColor: 'rgb(0, 158, 193)' }}>
                            <Text style={{ fontSize: 16, color: '#1299bb', fontWeight: 'bold', alignSelf: 'center' }}>CHỌN NGHỀ CHỌN TRƯỜNG{'\n'}</Text>
                        </View>
                    </TouchableOpacity>


                    <View style={{}}>

                        <Text style={{ flex: 3, fontWeight: 'bold', color: '#1299bb', fontSize: 15, marginLeft: 2 }}> {'\n'}  THÔNG TIN VỀ ỨNG DỤNG</Text>
                        <Text style={{ color: '#0a0a0a', fontWeight: 'bold', marginLeft: 20, marginRight: 20 }}>Ứng dụng Chọn nghề là một ứng dụng cho phép người dùng tra cứu thông tin nghề và cơ sở đào tạo trên phạm vi toàn quốc.</Text>

                        <Text style={{ flex: 3, fontWeight: 'bold', color: '#1299bb', fontSize: 15, marginLeft: 2 }}> {'\n'}  TỔNG CỤC GIÁO DỤC NGHỀ NGHIỆP</Text>
                        <Text style={{ color: '#0a0a0a', fontWeight: 'bold', marginLeft: 20, marginRight: 20 }}>Địa chỉ: 37B Nguyễn Bỉnh Khiêm - Quận Hai Bà Trưng, Hà Nội</Text>
                        <Text style={{ color: '#0a0a0a', fontWeight: 'bold', marginLeft: 20, marginRight: 20 }}>Điện thoại: 04.39745207 Fax: 0439740.339</Text>

                        <Text style={{ flex: 3, fontWeight: 'bold', color: '#1299bb', fontSize: 15, marginLeft: 2 }}> {'\n'}  CHỨC NĂNG</Text>
                        <Text style={{ color: '#0a0a0a', marginLeft: 20, marginRight: 20 }}>1. Tổng cục Giáo dục nghề nghiệp là tổ chức thuộc Bộ Lao động - Thương binh và Xã hội, thực hiện chức năng tham mưu, giúp Bộ trưởng Bộ Lao động - Thương binh và Xã hội quản lý nhà nước và tổ chức thực thi pháp luật về giáo dục nghề nghiệp (trừ sư phạm) trong phạm vi cả nước; quản lý, thực hiện các dịch vụ công về giáo dục nghề nghiệp thuộc thẩm quyền theo quy định của pháp luật.</Text>
                        <Text style={{ color: '#0a0a0a', marginLeft: 20, marginRight: 20 }}>2. Tổng cục Giáo dục nghề nghiệp có tư cách pháp nhân, con dấu hình Quốc huy, có tài khoản riêng tại Kho bạc Nhà nước, trụ sở tại thành phố Hà Nội.</Text>

                        <Text style={{ flex: 3, fontWeight: 'bold', color: '#1299bb', fontSize: 15, marginLeft: 2 }}> {'\n'}  NHIỆM VỤ QUYỀN HẠN</Text>
                        <Text style={{ color: '#0a0a0a', marginLeft: 20, marginRight: 20 }}>Tổng cục Giáo dục nghề nghiệp thực hiện những nhiệm vụ, quyền hạn cụ thể sau đây:{'\n'}

                            1. Trình Bộ trưởng Bộ Lao động - Thương binh và Xã hội ban hành theo thẩm quyền hoặc trình cơ quan nhà nước có thẩm quyền: {'\n'}

                            a) Dự án luật, dự thảo nghị quyết của Quốc hội; dự án pháp lệnh, dự thảo nghị quyết của Ủy ban Thường vụ Quốc hội; dự thảo nghị quyết, nghị định của Chính phủ; dự thảo quyết định của Thủ tướng Chính phủ; dự thảo thông tư, quyết định của Bộ trưởng Bộ Lao động - Thương binh và Xã hội;{'\n'}

                            b) Chiến lược, quy hoạch, kế hoạch năm năm và hàng năm về giáo dục nghề nghiệp; quy chuẩn kỹ thuật quốc gia, định mức kinh tế - kỹ thuật chuyên ngành trong lĩnh vực giáo dục nghề nghiệp; tiêu chuẩn kỹ năng nghề quốc gia.

 {'\n'} 2. Giúp Bộ trưởng Bộ Lao động - Thương binh và Xã hội chỉ đạo, hướng dẫn và tổ chức thực hiện các văn bản quy phạm pháp luật, chính sách, chiến lược, quy hoạch, kế hoạch, chương trình mục tiêu quốc gia, chương trình mục tiêu và các đề án, dự án trong lĩnh vực giáo dục nghề nghiệp.

 {'\n'}3. Ban hành theo thẩm quyền văn bản hướng dẫn chuyên môn, nghiệp vụ về giáo dục nghề nghiệp thuộc phạm vi quản lý nhà nước của Tổng cục.

{'\n'}4. Quản lý các bậc trình độ giáo dục nghề nghiệp của khung trình độ quốc gia; thực hiện tham chiếu các trình độ của giáo dục nghề nghiệp với Khung tham chiếu trình độ khu vực ASEAN và với các khung trình độ quốc gia khác.

{'\n'}5. Về đào tạo chính quy:

{'\n'}a) Quản lý danh mục ngành, nghề đào tạo trình độ cao đẳng, trung cấp; ngành, nghề nặng nhọc, độc hại; ngành, nghề khó tuyển sinh nhưng xã hội có nhu cầu; ngành, nghề được phép hợp tác, đầu tư với nước ngoài trong lĩnh vực giáo dục nghề nghiệp và ngành, nghề doanh nghiệp phải sử dụng lao động qua đào tạo giáo dục nghề nghiệp;

{'\n'}b) Xây dựng khối lượng kiến thức tối thiểu đối với từng trình độ đào tạo và từng ngành, nghề đào tạo, yêu cầu về năng lực mà người học phải đạt được sau khi tốt nghiệp đối với từng trình độ đào tạo của giáo dục nghề nghiệp;

{'\n'}c) Hướng dẫn thực hiện quy trình xây dựng, thẩm định, ban hành chương trình đào tạo trình độ sơ cấp, trung cấp, cao đẳng;

{'\n'}d) Theo dõi việc tổ chức thực hiện chương trình đào tạo theo niên chế, theo phương thức tích lũy mô-đun hoặc tín chỉ;

{'\n'}đ) Hướng dẫn các cơ sở giáo dục nghề nghiệp biên soạn, lựa chọn, thẩm định, phê duyệt và sử dụng chương trình, giáo trình đào tạo; áp dụng các chương trình đào tạo của nước ngoài; xác định chỉ tiêu và quy chế tuyển sinh, thi, kiểm tra, công nhận tốt nghiệp, cấp bằng, chứng chỉ. Kiểm tra các cơ sở giáo dục nghề nghiệp ở Việt Nam trong việc cấp bằng, chứng chỉ của nước ngoài; đào tạo liên thông và liên kết đào tạo của các cơ sở giáo dục nghề nghiệp; xây dựng tiêu chí, tiêu chuẩn và tổ chức thực hiện việc đánh giá, công nhận trường chất lượng cao.

{'\n'}6. Về đào tạo thường xuyên:

{'\n'}a) Hướng dẫn xây dựng, quản lý danh mục ngành, nghề đào tạo thường xuyên;

{'\n'}b) Hướng dẫn việc thực hiện các chương trình đào tạo thường xuyên theo yêu cầu của người học; chương trình bồi dưỡng, cập nhật, nâng cao kiến thức, kỹ năng nghề nghiệp; chương trình đào tạo theo hình thức kèm cặp nghề, truyền nghề, tập nghề; chương trình chuyển giao công nghệ; chương trình đào tạo khác có thời gian đào tạo dưới 03 tháng; chương trình đào tạo để lấy bằng tốt nghiệp cao đẳng, trung cấp và chứng chỉ sơ cấp theo hình thức vừa làm vừa học, học từ xa, tự học có hướng dẫn và việc đào tạo, bồi dưỡng, nâng cao trình độ kỹ năng nghề; học nghề, tập nghề trong doanh nghiệp;

{'\n'}c) Tổ chức thực hiện quy định về đào tạo thường xuyên, đào tạo nghề cho lao động nông thôn, đào tạo nghề trong doanh nghiệp; về thực hiện chính sách hỗ trợ đào tạo đối với lao động nông thôn, người khuyết tật, người dân tộc thiểu số, lao động nữ và các đối tượng chính sách khác theo quy định.

{'\n'}7. Về nhà giáo và cán bộ quản lý giáo dục nghề nghiệp:

{'\n'}a) Phối hợp, xây dựng chuẩn về chuyên môn nghiệp vụ, tiêu chuẩn chức danh nghề nghiệp của nhà giáo và cán bộ quản lý giáo dục nghề nghiệp các cấp;

{'\n'}b) Xây dựng và tổ chức thực hiện các chương trình bồi dưỡng về chuyên môn, nghiệp vụ sư phạm và kỹ năng nghề để dạy thực hành cho nhà giáo và cán bộ quản lý giáo dục nghề nghiệp theo thẩm quyền. Quản lý và tổ chức việc đào tạo, bồi dưỡng nhà giáo và cán bộ quản lý giáo dục nghề nghiệp, người dạy các chương trình đào tạo thường xuyên;

{'\n'}c) Hướng dẫn việc tuyển dụng viên chức giáo dục nghề nghiệp; thực hiện chế độ, chính sách, tiêu chuẩn chuyên môn, nghiệp vụ của nhà giáo và người đứng đầu cơ sở giáo dục nghề nghiệp; thực hiện quy chế đánh giá viên chức giáo dục nghề nghiệp;

{'\n'}d) Phối hợp, tổ chức thi nâng hạng chức danh nghề nghiệp viên chức giáo dục nghề nghiệp theo thẩm quyền;

{'\n'}đ) Hướng dẫn tổ chức Hội giảng nhà giáo giáo dục nghề nghiệp các cấp; tổ chức Hội giảng nhà giáo giáo dục nghề nghiệp cấp quốc gia.

{'\n'}8. Về công tác học sinh, sinh viên:

{'\n'}a) Hướng dẫn việc thực hiện quy chế công tác học sinh sinh viên; việc thực hiện công tác phòng, chống tội phạm, tệ nạn xã hội và xây dựng môi trường giáo dục lành mạnh trong cơ sở giáo dục nghề nghiệp và công tác giáo dục tư tưởng chính trị, đạo đức, lối sống, văn hóa, thẩm mỹ cho học sinh sinh viên; công tác giáo dục thể chất, y tế, thi đua, khen thưởng trong các cơ sở giáo dục nghề nghiệp;

{'\n'}b) Tổ chức thực hiện chính sách tín dụng học sinh sinh viên, học bổng từ ngân sách nhà nước; việc quản lý học phí, chính sách miễn giảm học phí, hỗ trợ chi phí đào tạo nghề nghiệp và các chính sách khác đối với người học các chương trình giáo dục nghề nghiệp;

{'\n'}c) Quản lý hoạt động nghiên cứu khoa học, tư vấn nghề nghiệp, hướng nghiệp, khởi nghiệp cho học sinh sinh viên trong các cơ sở giáo dục nghề nghiệp;

{'\n'}d) Hướng dẫn việc thực hiện nhiệm vụ giáo dục quốc phòng - an ninh cho học sinh, sinh viên của các cơ sở giáo dục nghề nghiệp. Định kỳ tổ chức hội thi văn hóa văn nghệ, thể dục thể thao học sinh sinh viên cấp quốc gia.

{'\n'}9. Về cơ sở vật chất và thiết bị đào tạo:

{'\n'}a) Xây dựng định mức kinh tế - kỹ thuật trong đào tạo đối với từng ngành, nghề theo từng trình độ đào tạo và các ngành, nghề trọng điểm theo các cấp độ. Xây dựng và hướng dẫn thực hiện tiêu chuẩn cơ sở vật chất của cơ sở giáo dục nghề nghiệp, tiêu chuẩn cơ sở vật chất phục vụ giáo dục thể chất và hoạt động thể thao trong các cơ sở giáo dục nghề nghiệp; danh mục thiết bị đào tạo tối thiểu của từng ngành, nghề; mức tiêu hao vật tư, thiết bị trong quá trình đào tạo cho từng ngành, nghề theo các cấp trình độ đào tạo.

{'\n'}b) Tổ chức thực hiện việc tiếp nhận và áp dụng tiêu chuẩn cơ sở vật chất, danh mục thiết bị đào tạo theo chương trình chuyển giao của nước ngoài;

{'\n'}c) Hướng dẫn tổ chức Hội thi thiết bị đào tạo tự làm các cấp; tổ chức Hội thi thiết bị đào tạo tự làm cấp quốc gia.

{'\n'}10. Về kiểm định chất lượng giáo dục nghề nghiệp:

{'\n'}a) Hướng dẫn thực hiện các quy định về kiểm định chất lượng giáo dục nghề nghiệp;

{'\n'}b) Quản lý việc thực hiện kiểm định chất lượng giáo dục nghề nghiệp;

{'\n'}c) Xây dựng và hướng dẫn tổ chức thực hiện hệ thống bảo đảm chất lượng giáo dục nghề nghiệp; việc tự đánh giá chất lượng của các cơ sở giáo dục nghề nghiệp;

{'\n'}d) Tổ chức đào tạo, bồi dưỡng chuyên môn, nghiệp vụ cho kiểm định viên; quản lý, điều phối đội ngũ kiểm định viên chất lượng giáo dục nghề nghiệp;

{'\n'}đ) Tiếp nhận hồ sơ và hướng dẫn việc thành lập, tổ chức và hoạt động của trung tâm kiểm định chất lượng giáo dục nghề nghiệp; việc công nhận tổ chức của nước ngoài có thẩm quyền kiểm định chất lượng chương trình của nước ngoài đào tạo tại Việt Nam;

{'\n'}e) Tổ chức xây dựng khung bảo đảm chất lượng giáo dục nghề nghiệp quốc gia tham chiếu trình độ khu vực ASEAN và thế giới.

{'\n'}11. Về đánh giá, cấp chứng chỉ kỹ năng nghề quốc gia:

{'\n'}a) Quản lý khung trình độ kỹ năng nghề quốc gia và hệ thống tiêu chuẩn kỹ năng nghề quốc gia, việc công nhận lẫn nhau về kỹ năng nghề giữa các quốc gia;

{'\n'}b) Hướng dẫn việc xây dựng tiêu chuẩn kỹ năng nghề quốc gia cho từng nghề và từng bậc trình độ kỹ năng; chủ trì tổ chức thẩm định tiêu chuẩn kỹ năng nghề quốc gia; rà soát, cập nhật tiêu chuẩn kỹ năng nghề quốc gia; hướng dẫn sử dụng tiêu chuẩn kỹ năng nghề quốc gia và áp dụng tiêu chuẩn kỹ năng nghề của các nước khu vực ASEAN và thế giới vào Việt Nam;

{'\n'}c) Tổ chức biên soạn đề thi kỹ năng nghề quốc gia; xây dựng danh mục cơ sở vật chất, trang thiết bị đánh giá kỹ năng nghề quốc gia cho từng nghề; thiết lập và quản lý ngân hàng đề thi kỹ năng nghề quốc gia;

{'\n'}d) Tổ chức đào tạo, bồi dưỡng chuyên môn, nghiệp vụ cho đánh giá viên và chuyên gia xây dựng, thẩm định tiêu chuẩn, đề thi kỹ năng nghề quốc gia; thực hiện việc cấp, thu hồi thẻ đánh giá viên kỹ năng nghề quốc gia và quản lý, điều phối đội ngũ đánh giá viên kỹ năng;

{'\n'}đ) Xây dựng kế hoạch, chỉ đạo việc tổ chức triển khai thực hiện đánh giá, cấp chứng chỉ kỹ năng nghề quốc gia; thực hiện việc cấp chứng chỉ kỹ năng nghề quốc gia và việc cấp, thu hồi giấy chứng nhận hoạt động đánh giá, cấp chứng chỉ kỹ năng nghề quốc gia;

{'\n'}e) Thiết lập và quản lý hệ thống cơ sở dữ liệu về đánh giá, cấp chứng chỉ kỹ năng nghề quốc gia;

{'\n'}g) Quản lý danh mục và đề xuất thay đổi các công việc ảnh hưởng đến an toàn sức khỏe của cá nhân và cộng đồng yêu cầu phải có chứng chỉ kỹ năng nghề quốc gia.

{'\n'}12. Hướng dẫn và tổ chức thực hiện công tác nghiên cứu, phổ biến, chuyển giao và ứng dụng khoa học, công nghệ trong lĩnh vực giáo dục nghề nghiệp theo quy định.

{'\n'}13. Thực hiện hợp tác quốc tế trong lĩnh vực giáo dục nghề nghiệp theo quy định của pháp luật và phân cấp của Bộ trưởng Bộ Lao động - Thương binh và Xã hội.

{'\n'}14. Tổ chức thực hiện công tác thống kê, thông tin và xây dựng cơ sở dữ liệu về giáo dục nghề nghiệp trong cả nước.

{'\n'}15. Hướng dẫn thi tay nghề các cấp; tổ chức Hội thi tay nghề quốc gia, tham gia Hội thi tay nghề khu vực ASEAN và thế giới.

{'\n'}16. Tổ chức tuyên truyền, phổ biến, giáo dục pháp luật thuộc phạm vi quản lý nhà nước về giáo dục nghề nghiệp.

{'\n'}17. Kiểm tra việc thành lập, chia, tách, sáp nhập, tạm đình chỉ hoạt động, giải thể, đổi tên cơ sở giáo dục nghề nghiệp; các hoạt động liên doanh, liên kết với nước ngoài; đăng ký hoạt động giáo dục nghề nghiệp; thành lập văn phòng đại diện của tổ chức, cơ sở giáo dục nghề nghiệp nước ngoài tại Việt Nam; việc thành lập các khoa sư phạm giáo dục nghề nghiệp thuộc trường cao đẳng; việc công nhận, không công nhận hiệu trưởng trường cao đẳng tư thục và có vốn đầu tư nước ngoài. Tổ chức thực hiện thành lập trường cao đẳng; đăng ký hoạt động giáo dục nghề nghiệp và đăng ký hoạt động liên kết đào tạo với nước ngoài đối với trường cao đẳng, cơ sở giáo dục đại học; công nhận hội đồng quản trị của trường cao đẳng tư thục và có vốn đầu tư nước ngoài.

{'\n'}18. Về thanh tra, kiểm tra, giải quyết khiếu nại, tố cáo:

{'\n'}a) Thực hiện chức năng thanh tra chuyên ngành về giáo dục nghề nghiệp. Tổ chức thực hiện thanh tra, kiểm tra và xử lý vi phạm pháp luật trong lĩnh vực giáo dục nghề nghiệp và đánh giá kỹ năng nghề quốc gia theo quy định;

{'\n'}b) Giải quyết khiếu nại, tố cáo trong lĩnh vực giáo dục nghề nghiệp theo thẩm quyền.

{'\n'}19. Quản lý tổ chức bộ máy, vị trí việc làm, biên chế công chức, viên chức, người lao động; thực hiện chế độ tiền lương và chế độ, chính sách khác đối với cán bộ, công chức, viên chức; thi đua khen thưởng trong lĩnh vực giáo dục nghề nghiệp thuộc phạm vi quản lý theo quy định của pháp luật và phân cấp của Bộ trưởng Bộ Lao động - Thương binh và Xã hội.

{'\n'}20. Quản lý tài chính, tài sản được giao và tổ chức thực hiện ngân sách được phân bổ theo quy định của pháp luật.

{'\n'}21. Thực hiện cải cách hành chính trong lĩnh vực giáo dục nghề nghiệp theo phân công của Bộ trưởng Bộ Lao động - Thương binh và Xã hội.

{'\n'}22. Thực hiện các nhiệm vụ khác do Bộ trưởng Bộ Lao động - Thương binh và Xã hội giao và theo quy định của pháp luật.</Text>


                        <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 15, marginLeft: 2 }}> {'\n'}  CÁC VĂN BẢN QUY PHẠM PHÁP LUẬT</Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Screen4', {
                                    url: 'http://gdnn.gov.vn/Default.aspx?tabid=89&cateid=546',
                                })
                            }} >
                            <Text style={{ marginLeft: 20, marginRight: 20 }}>Xem chi tiết >></Text>
                        </TouchableOpacity>

                        <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 15, marginLeft: 2 }}> {'\n'}  GIỚI THIỆU VỀ CHÍNH SÁCH</Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Screen4', {
                                    url: 'http://gdnn.gov.vn/AIAdmin/FAQs.aspx',
                                })
                            }} >
                            <Text style={{ marginLeft: 20, marginRight: 20, marginBottom: 2 }}>Xem chi tiết >></Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: '#ecaa45', marginLeft: 20 }}>{'\n'}GÓP Ý NỘI DUNG</Text>
                        <TextInput
                            underlineColorAndroid='transparent'
                            placeholder='Họ và tên'
                            placeholderTextColor='rgb(160, 169, 174)'
                            style={styles.input}
                            onChangeText={text => { this.setState({ Name: text }) }}
                            returnKeyType="next"
                            onSubmitEditing={() => this.NextText1.focus()}
                        />
                        <TextInput
                            underlineColorAndroid='transparent'
                            placeholder='Số điện thoại'
                            placeholderTextColor='rgb(160, 169, 174)'
                            style={styles.input}
                            onChangeText={text => { this.setState({ Phone: text }) }}
                            returnKeyType="next"
                            ref={(input) => this.NextText1 = input}
                            onSubmitEditing={() => this.NextText2.focus()}
                        />
                        <TextInput
                            underlineColorAndroid='transparent'
                            placeholder='Email'
                            placeholderTextColor='rgb(160, 169, 174)'
                            style={styles.input}
                            onChangeText={text => { this.setState({ Email: text }) }}
                            returnKeyType="next"
                            ref={(input) => this.NextText2 = input}
                            onSubmitEditing={() => this.NextText3.focus()}
                        />
                        <TextInput
                            underlineColorAndroid='transparent'
                            placeholder='Địa chỉ'
                            placeholderTextColor='rgb(160, 169, 174)'
                            onChangeText={text => { this.setState({ Address: text }) }}
                            style={styles.input}
                            returnKeyType="next"
                            ref={(input) => this.NextText3 = input}
                            onSubmitEditing={() => this.NextText4.focus()}
                        />

                        <TextInput
                            underlineColorAndroid='transparent'
                            multiline={true}
                            placeholder='Góp ý'
                            placeholderTextColor='rgb(160, 169, 174)'
                            onChangeText={text => { this.setState({ Content: text }) }}
                            style={styles.inputComment}
                            ref={(input) => this.NextText4 = input}
                            returnKeyType="Go"

                        />
                        <TouchableOpacity onPress={() => { this.fetchAddfeedback() }} style={{ backgroundColor: 'rgb(0, 161, 199)', width: 75, height: 35, marginTop: 10, marginBottom: 5, alignSelf: 'flex-end', marginRight: 40, borderRadius: 3, }}>
                            <Text style={{ fontSize: 15, color: 'white', marginLeft: 15, marginTop: 7 }}>Góp ý</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        );

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // justifyContent: 'flex-start',  
    },
    input: {
        height: 40,
        marginLeft: 40,
        marginRight: 40,
        color: 'black',
        borderWidth: 1,
        borderColor: '#78787a',
        paddingHorizontal: 10,
        marginTop: 10
        //backgroundColor: 'rgb(73, 124, 167)',
    },
    inputComment: {
        height: 60,
        marginLeft: 40,
        marginRight: 40,
        color: 'black',
        borderWidth: 1,
        borderColor: '#78787a',
        paddingHorizontal: 10,
        marginTop: 10
        //backgroundColor: 'rgb(73, 124, 167)',
    },
    inputComment2: {
        marginLeft: 10,
        marginRight: 10,
        height: 150,
        color: 'black',
        borderWidth: 1,
        borderColor: '#78787a',
        marginTop: 10
    }
})