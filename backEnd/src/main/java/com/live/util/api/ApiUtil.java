package com.live.util.api;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ApiUtil {
	
	// api 요청을 위한 HttpClient 객체 선언
	private final HttpClient client = HttpClient.newBuilder().build();
	// response(JSON)을 java 객체로 바꾸기 위한 objectMapper 객체 선언
	private final ObjectMapper objectMapper = new ObjectMapper();
	// response(XML)을 java 객체로 바꾸기 위한 objectMapper 객체 선언
    private final XmlMapper xmlMapper = new XmlMapper();
	
	
	 /**
	 * 입력받은 요청 데이터로 get방식으로 api 요청하는 메서드
	 * @param reqURL api 요청을 보낼 url / params을 비워서 사용할 경우 퀴리스트링 직접 입력하여 요청 가능
	 * 예시: https://apis.data.go.kr/1613000/RegionalCode/getRegionalCode?pageNo=1&numOfRows=10로 입력하여도 요청 가능
	 * @param params 쿼리 파라미터로 사용할 Map 객체 / null이나 빈값으로 넣는 경우는 퀴리스트링 추가 없이 url 생성
	 * 예시:
	 * Map<String, String> params = new HashMap<>();
	 * params.put("param1", "value1");
	 * params.put("param2", "값2");
	 * params.put("param3", "a b");
	 * @return JsonNode으로 파싱된 response 객체
	 */
	public JsonNode get(String reqURL,Map<String, String> params) {
		// api 요청할 url 생성
		String url = reqURL + toQueryString(params);
		
		log.info(url);
		
		HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create(url))
				.GET()
				.build(); //입력받은 url로 요청 생성
		try {
			HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString()); //api에 요청 후 응답
			log.info("GET 읍답 상태 : "+response.statusCode());
			log.info("GET 읍답 : "+response.body());
			return convertStringBodyToJsonNode(response); //응답을 JsonNode 객체로 변환 후 반환
		} catch (IOException | InterruptedException e) {
			log.info("GET 요청 실패 "+e.getMessage());
			e.printStackTrace();
			return null;
		}
		
	}
	
	 /**
     * 입력받은 요청 데이터로 post 방식으로 api 요청하는 메서드
     *
     * @param reqURL api 요청을 보낼 url
     * @param params 파라미터로 요청할 Map 객체
     * 예시:
     * Map<String, String> params = new HashMap<>();
     * params.put("param1", "value1");
     * params.put("param2", "값2");
     * params.put("param3", "a b");
     * @return JsonNode으로 파싱된 response 객체
     */
    public JsonNode post(String reqURL,Map<String, String> params) {
        String jsonBody;
        try {
            // 자바 객체 (requestBody)를 JSON 문자열로 직렬화합니다.
            jsonBody = objectMapper.writeValueAsString(params);
            // HttpRequest 빌더를 사용하여 POST 요청을 생성합니다.
        } catch (JsonProcessingException e) {
        	throw new RuntimeException("올바른 형태의 파라미터가 아닙니다.", e);
        }
        
        HttpRequest request = HttpRequest.newBuilder()
        		.uri(URI.create(reqURL)) // API 전체 URI 설정
        		.header("Content-Type", "application/json") // 보내는 데이터가 JSON임을 명시
        		.POST(HttpRequest.BodyPublishers.ofString(jsonBody)) // POST 메서드와 요청 본문 설정
        		.build();      
        
        try {
			HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString()); //api에 요청 후 응답
			log.info("POST 읍답 상태 : "+response.statusCode());
			log.info("POST 읍답 : "+response.body());
			return convertStringBodyToJsonNode(response); //응답을 JsonNode 객체로 변환 후 반환
		} catch (IOException | InterruptedException e) {
			log.info("POST 요청 실패 "+e.getMessage());
			e.printStackTrace();
			return null;
		}

    }
	
    /**
     * Map<String, String> 객체를 HTTP GET 요청에 사용될 쿼리 스트링으로 변환하는 메서드
     * 예시:
     * Map<String, String> params = new HashMap<>();
     * params.put("param1", "value1");
     * params.put("param2", "값2");
     * params.put("param3", "a b");
     *
     * 결과: "?param1=value1&param2=%EA%B0%922&param3=a%20b"
     *
     * @param params 쿼리 파라미터로 사용할 Map 객체
     * @return URL 쿼리 스트링 (예: "?key1=value1&key2=value2"), Map이 비어있으면 빈 문자열 반환
     */
    private String toQueryString(Map<String, String> params) {
    	// Map이 비어있으면 빈 문자열 반환
        if (params == null || params.isEmpty()) {
            return "";
        }

        // Map의 각 엔트리를 "key=value" 형태로 변환하고 URL 인코딩
        String queryString = params.entrySet().stream()
                .map(entry -> {
                    //String encodedKey = URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8);
                    //String encodedValue = URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8);
                    String encodedKey = entry.getKey();
                    String encodedValue = entry.getValue();
                    return encodedKey + "=" + encodedValue;
                })
                .collect(Collectors.joining("&")); // 각 "key=value" 쌍을 '&'로 연결

        return "?" + queryString; // 쿼리 스트링 앞에 '?' 추가
    }
	
    /**
     * HttpResponse<String>의 body를 JsonNode로 변환하는 메서드
     * @param response String body를 가진 HttpResponse 객체
     * @return 파싱된 JsonNode 객체
     * @throws JsonProcessingException JSON 파싱 중 오류가 발생할 경우
     */
    private JsonNode convertStringBodyToJsonNode(HttpResponse<String> response) throws JsonProcessingException {
        String bodyString = response.body(); // 응답 본문 (JSON 문자열)
        // body가 xml 형식으로 들어올때
        if(bodyString.indexOf('<') == 0) {        	
        	return xmlMapper.readTree(bodyString); // xml 문자열을 JsonNode 트리로 파싱        	
        } else {
        	return objectMapper.readTree(bodyString); // JSON 문자열을 JsonNode 트리로 파싱        	
        }
    }    	

    
    /**
     * JsonNode를 지정된 DTO 클래스 타입으로 변환
     * 예시 : regionalCodeDTO dto = api.convertJsonNodeToDto(jsonData, regionalCodeDTO.class);
     * @param jsonNode 변환할 JsonNode 객체
     * @param targetType 변환될 DTO 클래스의 타입
     * @param <T> DTO 클래스의 제네릭 타입
     * @return 파싱된 DTO 객체
     */
    public <T> T convertJsonNodeToDto(JsonNode jsonNode, Class<T> targetType)
            throws JsonProcessingException, IllegalArgumentException {

        if (jsonNode == null) {
            return null;
        }
        if (targetType == null) {
            throw new IllegalArgumentException("DTO 타겟은 필수값입니다");
        }

        // JsonNode를 targetType으로 변환
        return objectMapper.treeToValue(jsonNode, targetType);
    }
    
    /**
     * JsonNode (JSON 배열)를 지정된 DTO 타입의 List로 변환
     * 예시 : List<regionalCodeDTO> list = api.convertJsonNodeArrayToList(jsonData, new TypeReference<List<regionalCodeDTO>>() {});
     * @param jsonArrayNode 변환할 JSON 배열을 나타내는 JsonNode 객체
     * @param targetTypeRef 제네릭 타입 정보 유지를 위한 TypeReference (예: new TypeReference<List<ItemDto>>() {})
     * @param <T> 리스트에 포함될 DTO의 제네릭 타입
     * @return 파싱된 DTO 객체들을 담은 List. 변환 실패 또는 입력이 배열이 아닌 경우 빈 리스트 반환.
     */
    public <T> List<T> convertJsonNodeArrayToList(JsonNode jsonArrayNode, TypeReference<List<T>> targetTypeRef)
            throws IllegalArgumentException, IOException {

        // 입력 JsonNode가 null이거나, null 노드이거나, 배열이 아니면 빈 리스트 반환
        if (jsonArrayNode == null || jsonArrayNode.isNull() || !jsonArrayNode.isArray()) {
            System.err.println("입력 JsonNode는 JSON 배열이 아니거나 null입니다. 빈 리스트를 반환합니다.");
            return new ArrayList<>(); // 유효하지 않은 입력에 대해 빈 리스트 반환
        }
        if (targetTypeRef == null) {
            throw new IllegalArgumentException("DTO 타겟은 필수값입니다");
        }

        // JsonNode (배열)를 직접 List<T>로 변환
        return objectMapper.readValue(objectMapper.treeAsTokens(jsonArrayNode), targetTypeRef);
    }

}
