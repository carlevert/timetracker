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
public class EditServlet extends HttpServlet {

	@Override
	protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{ 
	    resp.setHeader("Access-Control-Allow-Origin", "*");
	}


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
