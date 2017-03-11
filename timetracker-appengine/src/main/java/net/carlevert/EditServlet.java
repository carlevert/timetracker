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
public class EditServlet extends HttpServlet {



	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		OfyService.registerEntities();

	
		String strRequest = CharStreams.toString(request.getReader());
		ObjectMapper mapper = new ObjectMapper();
		Break b = mapper.readValue(strRequest, Break.class);

		b = ofy().load().entity(b).now();
		
		
		ofy().save().entity(b).now();
		
		String strBreak = mapper.writeValueAsString(b);
		response.setContentType("application/json");
		response.getWriter().println(strBreak);

	}
}
