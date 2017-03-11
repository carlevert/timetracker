package net.carlevert;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.google.common.io.CharStreams;
import com.googlecode.objectify.ObjectifyService;

import static com.googlecode.objectify.ObjectifyService.ofy;

@SuppressWarnings("serial")
public class RegisterServlet extends HttpServlet {

	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		OfyService.registerEntities();

		String strRequest = CharStreams.toString(request.getReader());
		ObjectMapper objectMapper = new ObjectMapper();
		Break b = objectMapper.readValue(strRequest, Break.class);
		

		
		ofy().save().entity(b).now();
		
		String strBreak = objectMapper.writeValueAsString(b);
		response.setContentType("application/json");
		response.getWriter().println(strBreak);

	}
}
