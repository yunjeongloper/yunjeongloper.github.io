---
layout: post
title: TDD를 이용한 Spring 게시판 - 팀 프로젝트
tags: [portpolio, tdd, spring, java]
---

- 프로젝트 기간 : 2017.12 - 2018.01
- 사용 언어 및 프레임워크 : JAVA, Spring4
- 사용 tool : IntelliJ, git, Jira, telegram
- OS 및 DB : Mac OS, Maria DB, Mybatis
- [프로젝트 github 링크](https://github.com/yunjeongloper/portfolio/tree/master/member-boardPrj)
- 프로젝트 소개 : TDD(테스트 주도 개발 방법론)과 Spring framework로 간단한 게시판을 만드는 팀 프로젝트

회사 내에서 진행한 토이 프로젝트입니다.<br /> 개발 기간은 대략 한 달 정도이지만 기능 구현보다는 **TDD에 대한 이해와 협업 툴을 익히는 것**에 대부분의 시간을 소요하였습니다.
개인적으로 학습 한 후 담당한 Test코드를 발표하고 리뷰를 받는 방식을 거듭하며 코드를 수정해 나갔습니다.
제가 담당한 부분은 **로그인과 댓글기능**이었습니다.
로그인 기능은 session 으로 처리하였습니다. 또한 로그인 실패 시 log 기록을 쌓아 계정이 잠겨지도록 했습니다. 댓글 기능은 CRUD(생성,조회,수정,삭제)를 구현하고 추가적으로 DB table에 부모값을 넣어 댓글에 댓글을 다는 부분을 구현하였습니다. DB 부모값과 jQuery를 사용하여서 view를 처리하였습니다.

> TDD 참조 <br />
[최범균님의 TDD 라이브 강연 _ 2013 Spring Camp](https://www.youtube.com/watch?v=AE7K-16dEjo&list=PLHr3_yhTovXUf3jdfQKsz_AueL_OPTZwD&index=6)<br />
[최용운님의 Spring MVC Test_2013 Spring Camp](https://youtu.be/k_88ADbuJqQ)<br />
[Spring-mvc-example github사이트](https://github.com/skprasadu/spring-mvc-examples/tree/master/bookstore-example-with-mvc)<br />
[JUnit testing of Spring MVC application: Testing the Service Layer](https://dzone.com/articles/junit-testing-spring-mvc-0)

위의 사이트들을 보며 Service -> Controller 순으로 테스트 코드를 작성하였습니다. 가능한 많은 경우의 예외 상황을 고려하는 것의 중요성을 느꼈습니다. 테스트 도구로는 SpringJUnit4ClassRunner 클래스의 **JUnit** 을 사용하였습니다.

처음엔 전체적으로 느렸지만 테스트 코드 작성이 익숙해 지면서 정확하고 빠른 품질이 좋은 코드에 한발짝 다가갈 수 있었습니다. 추가적으로 예외 처리와 Dao 테스트 코드를 보완하면 좋을 것 같습니다.

## Source Code Example Repository
아래에 있는 댓글 예제 코드는 이렇게 구성되어있습니다.
<center>
<img src="{{ "/assets/img/tdd_repository.jpg" | absolute_url }}" alt="" width="90%"/>
</center>

## Source Code Example

**1 댓글 삽입 기능의 Service Test Code**

```
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
public class ReplyServiceImplTest {

  @Configuration
  static class ReplyServiceTestContextConfiguration {

    @Bean
    public ReplyService replyService() {
      return new ReplyServiceImpl();
    }

    @Bean
    public ReplyDAO replyDAO() {
      return mock(ReplyDAO.class);
    }
  }

  @Autowired
  ReplyService replyService;

  @Autowired
  ReplyDAO replyDAO;

  String boardNo = "3";

  String replyNo = "1";

  String reContent = "수정테스트";

  ReplyDTO replyDTO = new ReplyDTO(replyNo, "3", "하하하", "72", "1");

  // insertReply -------------------------------------------------

  private void whenInsertParamsIllegal(String board_no, String content, String writer,
      String parents_no) {

    runInsertParamsAssertEx(board_no, content, writer, parents_no, IllegalStateException.class);
  }

  private void whenInsertParamsNull(String board_no, String content, String writer,
      String parents_no) {

    runInsertParamsAssertEx(board_no, content, writer, parents_no, NullPointerException.class);
  }

  private void whenInsertParamsInvalid(String board_no, String content, String writer,
      String parents_no) {

    runInsertParamsAssertEx(board_no, content, writer, parents_no, InsertReplyErrorException.class);
  }

  private void runInsertParamsAssertEx(String board_no, String content, String writer,
      String parents_no, Class<? extends RuntimeException> exceptionType) {

    Exception thrownEx = null;
    try {
      replyService.insertReply(new ReplyDTO(board_no, content, writer, parents_no));
      fail();
    } catch (Exception ex) {
      thrownEx = ex;
    }
    assertThat(thrownEx, instanceOf(exceptionType));
  }

  // 글번호가 비정상인 경우 (쉬운, 정상에서 벗어난)
  // 내용이 비정상인 경우 (쉬운, 정상에서 벗어난)
  // 작성자번호가 비정상인 경우 (쉬운, 정상에서 벗어난)
  // 부모번호 비정상인 경우 (쉬운, 정상에서 벗어난)
  @Test
  public void insertReplyIllegalFailTest() {

    whenInsertParamsIllegal("", "글번호오류", "72", "1");
    whenInsertParamsIllegal("3", "", "72", "1");
    whenInsertParamsIllegal("3", "작성자번호오류", "", "1");
    whenInsertParamsIllegal("3", "부모번호오류", "72", "");
  }

  @Test
  public void insertReplyNullFailTest() {

    whenInsertParamsNull(null, "글번호오류", "72", "1");
    whenInsertParamsNull("3", null, "72", "1");
    whenInsertParamsNull("3", "작성자번호오류", null, "1");
    whenInsertParamsNull("3", "부모번호오류", "72", null);
  }

  // 게시글번호가 존재하지 않는 경우(정상에서 벗어난)
  // 작성자번호가 존재하지 않는 경우(정상에서 벗어난)
  // 부모번호가 존재하지 않는 경우(정상에서 벗어난)
  @Test
  public void insertReplyInvalidFailTest() {

    whenInsertParamsInvalid("22222234334334343433", "글번호오류", "72", "0");
    whenInsertParamsInvalid("30", "작성자번호오류", "2222223434343433", "0");
    whenInsertParamsInvalid("30", "부모번호오류", "74", "2222223434343433");
  }

  // 댓글 삽입 성공
  @Test
  public void insertReplySuccessTest() {

    // 댓글 등록 성공시
    when(replyDAO.insertReply(replyDTO)).thenReturn(1);
    when(replyDAO.updateReplyParents(replyNo)).thenReturn(1);

    assertThat(replyDAO.insertReply(replyDTO), is(1));
  }

}

```

**2 댓글 삽입 기능의 Service Main Code**

```
@Service
@Transactional
public class ReplyServiceImpl implements ReplyService {

  @Autowired
  private ReplyDAO replyDAO;

  @Override
  public int insertReply(ReplyDTO replyDTO) {

    checkInfo(replyDTO);

    int insertResult = replyDAO.insertReply(replyDTO);
    int updateResult = 0;

    // replyDTO가 정상적으로 insert 됨
    if( insertResult == 1) {

      // replyDTO의 부모값 업데이트 함
      updateResult = replyDAO.updateReplyParents(replyDTO.getNo());

    } else {

      throw new InsertReplyErrorException();
    }

    return updateResult;
  }
}
```

**3 댓글 삽입 기능의 Controller Test Code**

```

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(locations = {"file:src/main/webapp/WEB-INF/config/spring/dispatcher-servlet.xml", "file:src/main/webapp/WEB-INF/config/context-common.xml", "file:src/main/webapp/WEB-INF/config/context-datasource.xml"})
@Transactional
@ActiveProfiles("dev")
public class ReplyControllerTest {

  @Autowired
  private WebApplicationContext context;

  private MockMvc mock;

  private MockHttpSession session = new MockHttpSession();

  @Before
  public void setup() {

    mock = MockMvcBuilders.webAppContextSetup(context).build();

    session.setAttribute("memberNo","20");
  }


  // insertReply ------------------------------------------------

  public void replyInsertTest(String board_no, String content, String writer, String parents_no, String result, String errorMsg) throws Exception {

    mock.perform(get("/board/replyInsert.do").session(session)
        .param("board_no", board_no)
        .param("content", content)
        .param("parents_no", parents_no)
        .param("writer", writer))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.result").value(result))
        .andExpect(jsonPath("$.errorMsg").value(errorMsg))
        .andDo(MockMvcResultHandlers.print());
  }

  @Test
  public void insertReply_fail() throws Exception {

    replyInsertTest("","하하하","72","0","0","java.lang.IllegalStateException: BoardNumError");
    replyInsertTest("3","","72","0","0","java.lang.IllegalStateException: ContentNullError");
    replyInsertTest("3","하하하","","0","0","java.lang.IllegalStateException: WriterNumError");
    replyInsertTest("3","하하하","72","","0","java.lang.IllegalStateException: ParentsNumError");
  }

  @Test
  public void insertReply_success() throws Exception {

    replyInsertTest("3","하하하","72","0","1",null);
  }
}
```

**4 댓글 삽입 기능의 Controller Main Code**

```
@Controller
@RequestMapping("/board")
public class ReplyController {

  @Autowired
  private ReplyService replyService;

  @RequestMapping(value = "/replyInsert.do", method = RequestMethod.GET)
  @ResponseBody
  public Map replyInsert(@ModelAttribute ReplyDTO replyDTO, HttpSession session, String boardNum) {

    Map<String, String> status = new HashMap<>();

    // default 999
    status.put("result", "999");

    try {

      // 성공하면 1
      int resultBoolean = replyService.insertReply(replyDTO);
      status.put("result", String.valueOf(resultBoolean));

    } catch (Exception failLength) {

      // 실패하면 0
      status.put("result", "0");
      status.put("errorMsg", failLength.toString());
    }

    return status;

  }
}
```
