package net.carlevert;

import java.io.IOException;
import java.util.Date;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

@SuppressWarnings("serial")
public class BreakDeserializer extends StdDeserializer<Break> {

	public BreakDeserializer() { 
	        this(null); 
	    }

	public BreakDeserializer(Class<?> vc) { 
	        super(vc); 
	    }

	@Override
	public Break deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
		
		JsonNode node = jp.getCodec().readTree(jp);
		
		Break b = new Break();
		
		if (node.get("id").isLong())
			b.id = node.get("id").longValue();
		b.userId = node.get("userId").asText();
		b.from = new Date(node.get("from").longValue());
		b.to = new Date(node.get("to").longValue());
		b.adjustment = node.get("adjustment").intValue();
		b.note = node.get("note").asText();
		
		return b;
	}
}



