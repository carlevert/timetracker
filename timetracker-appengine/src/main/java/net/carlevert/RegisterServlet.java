package net.carlevert;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.CharStreams;
import static com.googlecode.objectify.ObjectifyService.ofy;

@SuppressWarnings("serial")
public class RegisterServlet extends HttpServlet {

	@Override
	protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{ 
	    resp.setHeader("Access-Control-Allow-Origin", "*");
	    resp.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
	}

	
	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setHeader("Access-Control-Allow-Origin", "*");
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
